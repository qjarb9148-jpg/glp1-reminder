import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DEFAULT_INVENTORY, DEFAULT_SETTINGS, storage } from '../storage/storage';
import {
  AppSettings,
  DoseRecord,
  InjectionSite,
  InventoryState,
  MedicationProfile,
  SideEffectLog,
} from '../types';
import { getRefillInfo } from '../utils/schedule';
import {
  cancelAllNotifications,
  scheduleRefillReminder,
  scheduleWeeklyDoseReminder,
} from '../utils/notifications';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

interface AppDataContextValue {
  loading: boolean;
  profile: MedicationProfile | null;
  doseRecords: DoseRecord[];
  sideEffectLogs: SideEffectLog[];
  inventory: InventoryState;
  settings: AppSettings;
  saveProfile: (profile: MedicationProfile) => Promise<void>;
  addDoseRecord: (site: InjectionSite, notes?: string) => Promise<DoseRecord>;
  addSideEffectLog: (log: Omit<SideEffectLog, 'id'>) => Promise<void>;
  setPensRemaining: (count: number) => Promise<void>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  resetAllData: () => Promise<void>;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<MedicationProfile | null>(null);
  const [doseRecords, setDoseRecords] = useState<DoseRecord[]>([]);
  const [sideEffectLogs, setSideEffectLogs] = useState<SideEffectLog[]>([]);
  const [inventory, setInventory] = useState<InventoryState>(DEFAULT_INVENTORY);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    (async () => {
      const [p, records, logs, inv, s] = await Promise.all([
        storage.getProfile(),
        storage.getDoseRecords(),
        storage.getSideEffectLogs(),
        storage.getInventory(),
        storage.getSettings(),
      ]);
      setProfile(p);
      setDoseRecords(records);
      setSideEffectLogs(logs);
      setInventory(inv);
      setSettings(s);
      setLoading(false);
    })();
  }, []);

  const syncNotifications = useCallback(
    async (
      nextProfile: MedicationProfile | null,
      nextRecords: DoseRecord[],
      nextInventory: InventoryState,
      nextSettings: AppSettings
    ) => {
      await cancelAllNotifications();
      if (!nextProfile || !nextSettings.onboardingComplete) return;

      await scheduleWeeklyDoseReminder(
        nextProfile,
        nextSettings.notificationHour,
        nextSettings.notificationMinute
      );

      if (nextInventory.pensRemaining > 0) {
        const { refillReminderDate } = getRefillInfo(
          nextProfile,
          nextRecords,
          nextInventory.pensRemaining
        );
        await scheduleRefillReminder(refillReminderDate);
      }
    },
    []
  );

  const saveProfile = useCallback(
    async (nextProfile: MedicationProfile) => {
      setProfile(nextProfile);
      await storage.setProfile(nextProfile);
      const nextSettings = { ...settings, onboardingComplete: true };
      setSettings(nextSettings);
      await storage.setSettings(nextSettings);
      await syncNotifications(nextProfile, doseRecords, inventory, nextSettings);
    },
    [settings, doseRecords, inventory, syncNotifications]
  );

  const addDoseRecord = useCallback(
    async (site: InjectionSite, notes?: string) => {
      if (!profile) throw new Error('약물 프로필이 설정되지 않았어요.');
      const record: DoseRecord = {
        id: generateId(),
        dateTime: new Date().toISOString(),
        site,
        doseMg: profile.doseMg,
        notes,
      };
      const nextRecords = [...doseRecords, record];
      setDoseRecords(nextRecords);
      await storage.setDoseRecords(nextRecords);

      const nextInventory: InventoryState = {
        pensRemaining: Math.max(inventory.pensRemaining - 1, 0),
        lastUpdated: new Date().toISOString(),
      };
      setInventory(nextInventory);
      await storage.setInventory(nextInventory);

      await syncNotifications(profile, nextRecords, nextInventory, settings);
      return record;
    },
    [profile, doseRecords, inventory, settings, syncNotifications]
  );

  const addSideEffectLog = useCallback(
    async (log: Omit<SideEffectLog, 'id'>) => {
      const next = [...sideEffectLogs, { ...log, id: generateId() }];
      setSideEffectLogs(next);
      await storage.setSideEffectLogs(next);
    },
    [sideEffectLogs]
  );

  const setPensRemaining = useCallback(
    async (count: number) => {
      const next: InventoryState = { pensRemaining: count, lastUpdated: new Date().toISOString() };
      setInventory(next);
      await storage.setInventory(next);
      await syncNotifications(profile, doseRecords, next, settings);
    },
    [profile, doseRecords, settings, syncNotifications]
  );

  const updateSettings = useCallback(
    async (partial: Partial<AppSettings>) => {
      const next = { ...settings, ...partial };
      setSettings(next);
      await storage.setSettings(next);
      await syncNotifications(profile, doseRecords, inventory, next);
    },
    [settings, profile, doseRecords, inventory, syncNotifications]
  );

  const resetAllData = useCallback(async () => {
    await cancelAllNotifications();
    await storage.resetAll();
    setProfile(null);
    setDoseRecords([]);
    setSideEffectLogs([]);
    setInventory(DEFAULT_INVENTORY);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      profile,
      doseRecords,
      sideEffectLogs,
      inventory,
      settings,
      saveProfile,
      addDoseRecord,
      addSideEffectLog,
      setPensRemaining,
      updateSettings,
      resetAllData,
    }),
    [
      loading,
      profile,
      doseRecords,
      sideEffectLogs,
      inventory,
      settings,
      saveProfile,
      addDoseRecord,
      addSideEffectLog,
      setPensRemaining,
      updateSettings,
      resetAllData,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataContextValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider');
  return ctx;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguagePreference } from '../i18n/languages';
import {
  AppSettings,
  DoseRecord,
  InventoryState,
  MedicationProfile,
  SideEffectLog,
} from '../types';

const KEYS = {
  profile: '@glp1/profile',
  doseRecords: '@glp1/doseRecords',
  sideEffectLogs: '@glp1/sideEffectLogs',
  inventory: '@glp1/inventory',
  settings: '@glp1/settings',
} as const;

// Stored separately from KEYS: a language choice is a device/app preference,
// not medication data, so "데이터 초기화" (resetAll) must not clear it.
const LANGUAGE_KEY = '@glp1/languagePreference';

export const DEFAULT_SETTINGS: AppSettings = {
  notificationHour: 9,
  notificationMinute: 0,
  onboardingComplete: false,
};

export const DEFAULT_INVENTORY: InventoryState = {
  pensRemaining: 0,
  lastUpdated: new Date().toISOString(),
};

async function getJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function setJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getProfile: () => getJson<MedicationProfile | null>(KEYS.profile, null),
  setProfile: (value: MedicationProfile | null) => setJson(KEYS.profile, value),

  getDoseRecords: () => getJson<DoseRecord[]>(KEYS.doseRecords, []),
  setDoseRecords: (value: DoseRecord[]) => setJson(KEYS.doseRecords, value),

  getSideEffectLogs: () => getJson<SideEffectLog[]>(KEYS.sideEffectLogs, []),
  setSideEffectLogs: (value: SideEffectLog[]) => setJson(KEYS.sideEffectLogs, value),

  getInventory: () => getJson<InventoryState>(KEYS.inventory, DEFAULT_INVENTORY),
  setInventory: (value: InventoryState) => setJson(KEYS.inventory, value),

  getSettings: () => getJson<AppSettings>(KEYS.settings, DEFAULT_SETTINGS),
  setSettings: (value: AppSettings) => setJson(KEYS.settings, value),

  getLanguagePreference: () => getJson<LanguagePreference>(LANGUAGE_KEY, 'system'),
  setLanguagePreference: (value: LanguagePreference) => setJson(LANGUAGE_KEY, value),

  resetAll: async () => {
    await AsyncStorage.removeMany(Object.values(KEYS));
  },
};

export type DrugName = '위고비' | '마운자로' | '오젬픽' | '기타';

export type InjectionSite = '복부' | '허벅지-좌' | '허벅지-우' | '팔-좌' | '팔-우';

export const INJECTION_SITES: InjectionSite[] = [
  '복부',
  '허벅지-좌',
  '허벅지-우',
  '팔-좌',
  '팔-우',
];

export type Symptom = '메스꺼움' | '변비' | '설사' | '두통' | '기타';

export const SYMPTOMS: Symptom[] = ['메스꺼움', '변비', '설사', '두통', '기타'];

export const DRUG_NAMES: DrugName[] = ['위고비', '마운자로', '오젬픽', '기타'];

export interface DoseScheduleEntry {
  /** ISO date string (yyyy-MM-dd) the new dose takes effect */
  date: string;
  doseMg: number;
}

export interface MedicationProfile {
  drugName: DrugName;
  customDrugName?: string;
  /** Current/starting dose entered during onboarding, in mg */
  doseMg: number;
  /** Dose escalation plan, sorted ascending by date. Includes the starting dose entry. */
  doseSchedule: DoseScheduleEntry[];
  /** 0 (Sunday) - 6 (Saturday) */
  dayOfWeek: number;
}

export interface DoseRecord {
  id: string;
  /** ISO date-time string */
  dateTime: string;
  site: InjectionSite;
  doseMg: number;
  notes?: string;
}

export interface SideEffectLog {
  id: string;
  /** ISO date string (yyyy-MM-dd) */
  date: string;
  symptoms: Symptom[];
  intensity: number; // 1-5
  notes?: string;
}

export interface InventoryState {
  pensRemaining: number;
  lastUpdated: string;
}

export interface AppSettings {
  notificationHour: number;
  notificationMinute: number;
  onboardingComplete: boolean;
}

export interface AppData {
  profile: MedicationProfile | null;
  doseRecords: DoseRecord[];
  sideEffectLogs: SideEffectLog[];
  inventory: InventoryState;
  settings: AppSettings;
}

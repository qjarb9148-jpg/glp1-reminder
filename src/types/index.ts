// Internal identifiers only — never rendered directly. Display labels are
// looked up per-language via src/i18n (see translations/*.ts `drugNames`,
// `sites`, `symptoms`), so the app can be localized without touching
// stored data.
export type DrugName = 'wegovy' | 'mounjaro' | 'ozempic' | 'other';

export const DRUG_NAMES: DrugName[] = ['wegovy', 'mounjaro', 'ozempic', 'other'];

export type InjectionSite = 'abdomen' | 'thigh_left' | 'thigh_right' | 'arm_left' | 'arm_right';

export const INJECTION_SITES: InjectionSite[] = [
  'abdomen',
  'thigh_left',
  'thigh_right',
  'arm_left',
  'arm_right',
];

export type Symptom = 'nausea' | 'constipation' | 'diarrhea' | 'headache' | 'other';

export const SYMPTOMS: Symptom[] = ['nausea', 'constipation', 'diarrhea', 'headache', 'other'];

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

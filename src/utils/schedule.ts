import { DoseRecord, MedicationProfile } from '../types';
import { addDays, startOfDay } from './dateUtils';

const DOSE_INTERVAL_DAYS = 7;

/**
 * Returns the next scheduled dose date (midnight), based on the last
 * recorded dose (interval-based) and the configured weekly dosing day.
 */
export function getNextDoseDate(
  profile: MedicationProfile,
  doseRecords: DoseRecord[],
  from: Date = new Date()
): Date {
  const lastRecord = [...doseRecords].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  )[0];

  const base = lastRecord
    ? startOfDay(addDays(new Date(lastRecord.dateTime), 1))
    : startOfDay(from);

  const cursor = new Date(base);
  for (let i = 0; i < 7; i++) {
    if (cursor.getDay() === profile.dayOfWeek) {
      return cursor;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return cursor;
}

/** Days until the next dose date; negative means overdue. */
export function getDaysUntilNextDose(nextDoseDate: Date, from: Date = new Date()): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(nextDoseDate).getTime() - startOfDay(from).getTime()) / msPerDay);
}

/** Current effective dose in mg, based on the escalation schedule and today's date. */
export function getCurrentDoseMg(profile: MedicationProfile, today: Date = new Date()): number {
  const applicable = profile.doseSchedule
    .filter((entry) => new Date(entry.date).getTime() <= startOfDay(today).getTime())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return applicable[0]?.doseMg ?? profile.doseMg;
}

/** The next upcoming dose escalation entry, if any. */
export function getUpcomingDoseChange(profile: MedicationProfile, today: Date = new Date()) {
  const upcoming = profile.doseSchedule
    .filter((entry) => new Date(entry.date).getTime() > startOfDay(today).getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] ?? null;
}

export interface RefillInfo {
  /** Estimated date the current pen supply runs out. */
  runOutDate: Date;
  /** runOutDate minus a 3-day buffer; when to remind the user to refill. */
  refillReminderDate: Date;
  daysUntilRunOut: number;
}

export function getRefillInfo(
  profile: MedicationProfile,
  doseRecords: DoseRecord[],
  pensRemaining: number,
  from: Date = new Date()
): RefillInfo {
  const nextDoseDate = getNextDoseDate(profile, doseRecords, from);
  const remainingDoses = Math.max(pensRemaining - 1, 0);
  const runOutDate = addDays(nextDoseDate, remainingDoses * DOSE_INTERVAL_DAYS);
  const refillReminderDate = addDays(runOutDate, -3);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilRunOut = Math.round(
    (startOfDay(runOutDate).getTime() - startOfDay(from).getTime()) / msPerDay
  );

  return { runOutDate, refillReminderDate, daysUntilRunOut };
}

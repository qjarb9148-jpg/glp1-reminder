import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { LanguageCode } from '../i18n/languages';
import { getTranslations } from '../i18n/translations';
import { MedicationProfile } from '../types';

export const DOSE_REMINDER_ID = 'dose-reminder';
export const REFILL_REMINDER_ID = 'refill-reminder';

export const NOTIFICATION_CATEGORY_DOSE = 'dose-reminder-category';

const isWeb = Platform.OS === 'web';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensureNotificationPermissions(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.HIGH,
  }).catch(() => {});
}

export async function scheduleWeeklyDoseReminder(
  profile: MedicationProfile,
  hour: number,
  minute: number,
  language: LanguageCode
): Promise<void> {
  if (isWeb) return; // expo-notifications has no scheduling support on web

  await Notifications.cancelScheduledNotificationAsync(DOSE_REMINDER_ID).catch(() => {});

  const t = getTranslations(language);
  const drugLabel =
    profile.drugName === 'other' ? profile.customDrugName ?? t.drugNames.other : t.drugNames[profile.drugName];

  await Notifications.scheduleNotificationAsync({
    identifier: DOSE_REMINDER_ID,
    content: {
      title: t.notifications.doseTitle,
      body: t.notifications.doseBody(drugLabel),
      categoryIdentifier: NOTIFICATION_CATEGORY_DOSE,
      data: { type: DOSE_REMINDER_ID },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: profile.dayOfWeek + 1, // expo-notifications: 1(Sunday) - 7(Saturday)
      hour,
      minute,
    },
  });
}

export async function scheduleRefillReminder(refillReminderDate: Date, language: LanguageCode): Promise<void> {
  if (isWeb) return; // expo-notifications has no scheduling support on web

  await Notifications.cancelScheduledNotificationAsync(REFILL_REMINDER_ID).catch(() => {});

  const trigger = new Date(refillReminderDate);
  trigger.setHours(9, 0, 0, 0);
  if (trigger.getTime() <= Date.now()) {
    return;
  }

  const t = getTranslations(language);

  await Notifications.scheduleNotificationAsync({
    identifier: REFILL_REMINDER_ID,
    content: {
      title: t.notifications.refillTitle,
      body: t.notifications.refillBody,
      data: { type: REFILL_REMINDER_ID },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: trigger,
    },
  });
}

export async function cancelAllNotifications(): Promise<void> {
  if (isWeb) return; // expo-notifications has no scheduling support on web

  await Notifications.cancelAllScheduledNotificationsAsync();
}

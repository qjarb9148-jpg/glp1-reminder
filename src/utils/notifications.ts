import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
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
  minute: number
): Promise<void> {
  if (isWeb) return; // expo-notifications has no scheduling support on web

  await Notifications.cancelScheduledNotificationAsync(DOSE_REMINDER_ID).catch(() => {});

  const drugLabel = profile.drugName === '기타' ? profile.customDrugName ?? '주사제' : profile.drugName;

  await Notifications.scheduleNotificationAsync({
    identifier: DOSE_REMINDER_ID,
    content: {
      title: '투약 알림',
      body: `오늘은 ${drugLabel} 투여일이에요. 잊지 말고 맞아주세요!`,
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

export async function scheduleRefillReminder(refillReminderDate: Date): Promise<void> {
  if (isWeb) return; // expo-notifications has no scheduling support on web

  await Notifications.cancelScheduledNotificationAsync(REFILL_REMINDER_ID).catch(() => {});

  const trigger = new Date(refillReminderDate);
  trigger.setHours(9, 0, 0, 0);
  if (trigger.getTime() <= Date.now()) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    identifier: REFILL_REMINDER_ID,
    content: {
      title: '펜 재고 부족 예정',
      body: '펜 재고가 곧 소진될 예정이에요. 처방 리필을 준비하세요.',
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

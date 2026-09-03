import { createNavigationContainerRef } from '@react-navigation/native';

export type MainTabKey = 'home' | 'history' | 'sideEffects' | 'inventory' | 'settings';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: { initialTab?: MainTabKey } | undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateToDoseReminder() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('Main', { initialTab: 'home' });
  }
}

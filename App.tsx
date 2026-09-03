import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppDataProvider } from './src/context/AppDataContext';
import { LanguageProvider } from './src/i18n/LanguageContext';
import RootNavigator from './src/navigation/RootNavigator';
import { navigateToDoseReminder, navigationRef } from './src/navigation/types';
import { DOSE_REMINDER_ID } from './src/utils/notifications';

export default function App() {
  const responseListener = useRef<Notifications.EventSubscription | undefined>(undefined);

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const type = response.notification.request.content.data?.type;
      if (type === DOSE_REMINDER_ID) {
        navigateToDoseReminder();
      }
    });

    return () => {
      responseListener.current?.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AppDataProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </AppDataProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

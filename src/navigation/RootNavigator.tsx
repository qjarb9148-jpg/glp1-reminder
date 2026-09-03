import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAppData } from '../context/AppDataContext';
import MainTabsScreen from '../screens/MainTabsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = { headerShown: false };

export default function RootNavigator() {
  const { settings, loading } = useAppData();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={settings.onboardingComplete ? 'Main' : 'Onboarding'}
    >
      {settings.onboardingComplete ? (
        <Stack.Screen name="Main" component={MainTabsScreen} />
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
    </Stack.Navigator>
  );
}

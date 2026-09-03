import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

/**
 * True when running inside the Expo Go client app, which cannot load
 * custom native modules (e.g. react-native-google-mobile-ads).
 */
export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/**
 * True when the native ads module (react-native-google-mobile-ads) is safe
 * to load: not in Expo Go, and not on web (no web SDK support either).
 * Ad code must be skipped outside this and only run in a native/EAS build.
 */
export const isNativeAdsAvailable = !isExpoGo && Platform.OS !== 'web';

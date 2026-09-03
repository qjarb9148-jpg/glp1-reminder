import Constants, { ExecutionEnvironment } from 'expo-constants';

/**
 * True when running inside the Expo Go client app, which cannot load
 * custom native modules (e.g. react-native-google-mobile-ads). Ad code
 * must be skipped in this environment and only run in a native/EAS build.
 */
export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

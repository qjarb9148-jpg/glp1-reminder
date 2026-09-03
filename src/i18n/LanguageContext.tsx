import * as Localization from 'expo-localization';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../storage/storage';
import { DEFAULT_LANGUAGE, LanguageCode, LanguagePreference, matchSupportedLanguage } from './languages';
import { getTranslations, TranslationDict } from './translations';

interface LanguageContextValue {
  /** The user's stored choice: 'system' or an explicit language code. */
  languagePreference: LanguagePreference;
  /** The language actually in effect right now (preference resolved against the device language). */
  resolvedLanguage: LanguageCode;
  t: TranslationDict;
  setLanguagePreference: (preference: LanguagePreference) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Re-renders automatically whenever the device's language setting changes.
  const deviceLocales = Localization.useLocales();
  const [languagePreference, setLanguagePreferenceState] = useState<LanguagePreference>('system');

  useEffect(() => {
    storage.getLanguagePreference().then(setLanguagePreferenceState);
  }, []);

  const setLanguagePreference = useCallback(async (preference: LanguagePreference) => {
    setLanguagePreferenceState(preference);
    await storage.setLanguagePreference(preference);
  }, []);

  const systemLanguage = useMemo<LanguageCode>(() => {
    for (const locale of deviceLocales) {
      const match = matchSupportedLanguage(locale.languageCode ?? locale.languageTag);
      if (match) return match;
    }
    return DEFAULT_LANGUAGE;
  }, [deviceLocales]);

  const resolvedLanguage = languagePreference === 'system' ? systemLanguage : languagePreference;

  const value = useMemo(
    () => ({
      languagePreference,
      resolvedLanguage,
      t: getTranslations(resolvedLanguage),
      setLanguagePreference,
    }),
    [languagePreference, resolvedLanguage, setLanguagePreference]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

export type LanguageCode = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'hi';

/** User's stored choice: an explicit language, or 'system' to follow the device language. */
export type LanguagePreference = 'system' | LanguageCode;

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export const SUPPORTED_LANGUAGES: { code: LanguageCode; nativeName: string }[] = [
  { code: 'ko', nativeName: '한국어' },
  { code: 'en', nativeName: 'English' },
  { code: 'ja', nativeName: '日本語' },
  { code: 'zh', nativeName: '简体中文' },
  { code: 'es', nativeName: 'Español' },
  { code: 'hi', nativeName: 'हिन्दी' },
];

const SUPPORTED_CODES = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));

export function isSupportedLanguage(code: string): code is LanguageCode {
  return SUPPORTED_CODES.has(code as LanguageCode);
}

/** Maps a raw device locale (e.g. "en-US", "zh-Hans-CN") to a supported language, if any. */
export function matchSupportedLanguage(deviceLanguageTag: string | null | undefined): LanguageCode | null {
  if (!deviceLanguageTag) return null;
  const base = deviceLanguageTag.split('-')[0].toLowerCase();
  return isSupportedLanguage(base) ? base : null;
}

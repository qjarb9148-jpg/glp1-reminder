import { LanguageCode } from '../languages';
import en from './en';
import es from './es';
import hi from './hi';
import ja from './ja';
import ko from './ko';
import { TranslationDict } from './types';
import zh from './zh';

const dictionaries: Record<LanguageCode, TranslationDict> = { ko, en, ja, zh, es, hi };

export function getTranslations(language: LanguageCode): TranslationDict {
  return dictionaries[language];
}

export type { TranslationDict };

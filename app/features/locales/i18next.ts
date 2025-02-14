import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import es from './es.json';

export const resources = {
  en: en,
  es: es,
} as const;

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    debug: true,
    defaultNS: 'translation',
    //https://github.com/i18next/i18next/issues/1068
    fallbackLng: ['en', 'es'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
  });

export default i18n;

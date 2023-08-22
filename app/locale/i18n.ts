import I18nApp from 'react-native-i18n';
import en from './en';
import es from './es';

I18nApp.fallbacks = true;

I18nApp.translations = {
  en,
  es,
};

export default I18nApp;

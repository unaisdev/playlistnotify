import {resources} from '../locales/i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'es';
    resources: typeof resources;
  }
}

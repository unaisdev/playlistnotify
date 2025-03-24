export const APP_LANGUAGE = {
  ES: 'es',
  EN: 'en',
} as const;

export type APP_LANGUAGE_TYPE = (typeof APP_LANGUAGE)[keyof typeof APP_LANGUAGE];

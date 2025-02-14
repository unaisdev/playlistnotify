export const APP_THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type APP_THEME_TYPE = (typeof APP_THEME)[keyof typeof APP_THEME];

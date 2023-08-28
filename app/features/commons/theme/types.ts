import {ValueOf} from 'react-native-gesture-handler/lib/typescript/typeUtils';

export const APP_THEME = {
  DEFAULT: 'default',
  DARK_THEME: 'dark',
} as const;

export type APP_THEME_TYPE = (typeof APP_THEME)[keyof typeof APP_THEME];

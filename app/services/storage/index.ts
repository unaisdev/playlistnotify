import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '../constants';
import {APP_THEME_TYPE} from '@app/features/commons/theme/types';
import {APP_LANGUAGE_TYPE} from '@app/locales/types';

export const saveThemeOnStorage = async (theme: APP_THEME_TYPE) => {
  await AsyncStorage.setItem(ASYNC_STORAGE.THEME, theme);
};

export const getThemeFromStorage = async () => {
  return (await AsyncStorage.getItem(ASYNC_STORAGE.THEME)) as APP_THEME_TYPE;
};

export const saveLanguageOnStorage = async (language: APP_LANGUAGE_TYPE) => {
  await AsyncStorage.setItem(ASYNC_STORAGE.LANGUAGE, language);
};

export const getLanguageFromStorage = async () => {
  return (await AsyncStorage.getItem(
    ASYNC_STORAGE.LANGUAGE,
  )) as APP_LANGUAGE_TYPE;
};

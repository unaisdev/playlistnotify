import AsyncStorage from '@react-native-async-storage/async-storage';
import {BETA_STORAGE_KEY} from './constants';

export const saveBetaEmail = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(BETA_STORAGE_KEY, email);
  } catch (error) {
    console.error('Error saving beta email:', error);
  }
};

export const getBetaEmail = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(BETA_STORAGE_KEY);
  } catch (error) {
    console.error('Error getting beta email:', error);
    return null;
  }
};

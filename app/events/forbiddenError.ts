import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '@app/services/constants';
import {AppEvents, eventEmitter} from '.';

export const triggerForbiddenError = async (): Promise<void> => {
  await AsyncStorage.setItem(ASYNC_STORAGE.FORBIDDEN_ERROR, 'true');
  eventEmitter.emit(AppEvents.FORBIDDEN_ERROR);
};

export const clearForbiddenError = async (): Promise<void> => {
  await AsyncStorage.removeItem(ASYNC_STORAGE.FORBIDDEN_ERROR);
};

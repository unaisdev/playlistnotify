import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '@app/services/constants';
import {Alert} from 'react-native';
import {AppEvents, eventEmitter} from '@app/events';
import {clearForbiddenError} from '@app/events/forbiddenError';

export const useForbiddenError = () => {
  const [error, setHas403Error] = useState(false);

  const checkForbiddenError = async () => {
    const errorFlag = await AsyncStorage.getItem(ASYNC_STORAGE.FORBIDDEN_ERROR);
    if (errorFlag === 'true') {
      setHas403Error(true);
    }
  };

  const handleForbiddenError = () => {
    checkForbiddenError();
  };

  useEffect(() => {
    eventEmitter.on(AppEvents.FORBIDDEN_ERROR, handleForbiddenError);

    checkForbiddenError();

    return () => {
      eventEmitter.off(AppEvents.FORBIDDEN_ERROR, handleForbiddenError);
    };
  }, []);

  const handleClearError = async () => {
    await clearForbiddenError();
    setHas403Error(false);
  };

  return {error, handleClearError};
};

import { useCallback } from 'react';

import { authorize, refresh } from 'react-native-app-auth';
import EncryptedStorage from 'react-native-encrypted-storage';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../navigation';
import { useUserContext } from '../../../containers/UserContext';
import { AUTH_CONFIG, ENCRYPTED_STORAGE } from '../../../services/constants';

const useLogin = (
  navigation?: NativeStackNavigationProp<RootStackParamList>,
) => {
  const {setUser} = useUserContext();

  const init = async () => {
    const newUser = await isNewUser();
    if (newUser) return;

    handleLogin();
  };

  const handleLogin = async () => {
    const newUser = await isNewUser();
    if (newUser) {
      const logged = await handleStartSession();
      if (!logged) return;

      navigation?.replace('Tabs');
    } else {
      const isValid = await isTokenValid();

      if (!isValid) {
        const refreshed = await refreshToken();
        if (!refreshed) {
          const logged = await handleStartSession();
          if (!logged) return;
        }
      }

      navigation?.replace('Tabs');
    }
  };

  const isNewUser = async () => {
    const tokenExp = await EncryptedStorage.getItem(
      ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION,
    );
    const accessToken = await EncryptedStorage.getItem(
      ENCRYPTED_STORAGE.AUTH_TOKEN,
    );
    const refreshToken = await EncryptedStorage.getItem(
      ENCRYPTED_STORAGE.REFRESH_TOKEN,
    );

    if (!tokenExp && !accessToken && !refreshToken) {
      console.log('new user is here');
      return true;
    }

    return false;
  };

  const isTokenValid = async () => {
    try {
      const tokenExp = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION,
      );
      if (!tokenExp) {
        console.log('No expiration token!');
        return false;
      }

      const expiration = containsNonNumeric(tokenExp)
        ? Date.parse(tokenExp) / 1000
        : parseFloat(tokenExp);
      const nowSeconds = Date.now() / 1000;

      console.log('expiration:', new Date(expiration * 1000));
      console.log('nowSeconds:', new Date(nowSeconds * 1000));
      console.log('isTokenValid:', expiration >= nowSeconds);

      return expiration >= nowSeconds;
    } catch (error) {
      console.log('Error checking token validity:', error);
      return false;
    }
  };

  const handleStartSession = useCallback(async () => {
    try {
      const result = await authorize(AUTH_CONFIG);

      if (result && result.accessToken) {
        const nowSeconds = Date.now() / 1000;
        const expiration =
          new Date(result.accessTokenExpirationDate).getTime() / 1000;

        console.log('access token:', result.accessToken);
        console.log('token expires at:', expiration);
        console.log('refresh token:', result.refreshToken);

        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE.AUTH_TOKEN,
          result.accessToken,
        );
        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION,
          expiration.toString(),
        );
        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE.REFRESH_TOKEN,
          result.refreshToken,
        );

        return true;
      }

      return false;
    } catch (error) {
      console.log('handleStartSession', error);
      return false;
    }
  }, []);

  const refreshToken = async () => {
    const tokenExp = await EncryptedStorage.getItem(
      ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION,
    );
    if (!tokenExp) return;

    const expiration = containsNonNumeric(tokenExp)
      ? Date.parse(tokenExp) / 1000
      : parseFloat(tokenExp);
    const nowSeconds = Date.now() / 1000;

    if (expiration && expiration <= nowSeconds + 4000) {
      const refreshToken = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE.REFRESH_TOKEN,
      );
      if (!refreshToken) {
        console.log('No refresh token found.');
        return;
      }

      try {
        const data = await refresh(AUTH_CONFIG, {refreshToken});
        if (data && data.accessToken && data.refreshToken) {
          await EncryptedStorage.setItem(
            ENCRYPTED_STORAGE.AUTH_TOKEN,
            data.accessToken,
          );
          await EncryptedStorage.setItem(
            ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION,
            data.accessTokenExpirationDate,
          );
          await EncryptedStorage.setItem(
            ENCRYPTED_STORAGE.REFRESH_TOKEN,
            data.refreshToken,
          );

          console.log('Access token refreshed successfully.');
          console.log('New:', data.accessToken);
          return true;
        }
      } catch (error) {
        return false;
        console.log('Error refreshing access token:', error);
      }
    }
  };

  return {
    init,
    handleLogin,
    handleStartSession,
    isNewUser,
    isTokenValid,
    refreshToken,
  };
};

const containsNonNumeric = (inputString: string) => {
  const regex = /\D/;
  return regex.test(inputString);
};

export default useLogin;

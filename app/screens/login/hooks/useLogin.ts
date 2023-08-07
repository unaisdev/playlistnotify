import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize, refresh } from 'react-native-app-auth';
import { ASYNC_STORAGE } from '../../../constants';

const CLIENT_ID = 'df7cd23d00fe4f989f0eaeaa638f03cf';
const REDIRECT_URL = 'com.unaicanales.playlistnotify:/oauth';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const config = {
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  scopes: [
    'user-read-email',
    'user-read-private',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
  serviceConfiguration: discovery,
};

const useLogin = () => {
  const isTokenValid = async () => {
    try {
      const tokenExp = await AsyncStorage.getItem(
        ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION
      );
      if (!tokenExp) {
        console.log('No expiration token!');
        return false;
      }

      const expiration =
        containsNonNumeric(tokenExp)
          ? Date.parse(tokenExp) / 1000
          : parseFloat(tokenExp);
      const nowSeconds = Date.now() / 1000;

      console.log('expiration:', expiration);
      console.log('nowSeconds:', nowSeconds);
      console.log('isTokenValid:', expiration >= nowSeconds + 4000);

      return (expiration >= nowSeconds + 4000) 
    } catch (error) {
      console.log('Error checking token validity:', error);
      return false;
    }
  };

  const handleStartSession = useCallback(async () => {
    try {
      const result = await authorize(config);

      if (result && result.accessToken) {
        const nowSeconds = Date.now() / 1000;
        const expiration =
          new Date(result.accessTokenExpirationDate).getTime() / 1000;

        console.log('access token:', result.accessToken);
        console.log('token expires at:', expiration);
        console.log('refresh token:', result.refreshToken);

        await AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN, result.accessToken);
        await AsyncStorage.setItem(
          ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION,
          expiration.toString()
        );
        await AsyncStorage.setItem(
          ASYNC_STORAGE.REFRESH_TOKEN,
          result.refreshToken
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
    const tokenExp = await AsyncStorage.getItem(
      ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION
    );
    if (!tokenExp) return;

    const expiration =
      containsNonNumeric(tokenExp)
        ? Date.parse(tokenExp) / 1000
        : parseFloat(tokenExp);
    const nowSeconds = Date.now() / 1000;

    if (expiration && expiration <= nowSeconds + 4000) {
      const refreshToken = await AsyncStorage.getItem(
        ASYNC_STORAGE.REFRESH_TOKEN
      );
      if (!refreshToken) {
        console.log('No refresh token found.');
        return;
      }

      try {
        const data = await refresh(config, { refreshToken });
        if (data && data.accessToken && data.refreshToken) {
          await AsyncStorage.setItem(
            ASYNC_STORAGE.AUTH_TOKEN,
            data.accessToken
          );
          await AsyncStorage.setItem(
            ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION,
            data.accessTokenExpirationDate
          );
          await AsyncStorage.setItem(
            ASYNC_STORAGE.REFRESH_TOKEN,
            data.refreshToken
          );

          console.log('Access token refreshed successfully.');
          console.log('New:', data.accessToken);
        }
      } catch (error) {
        console.log('Error refreshing access token:', error);
      }
    }
  };

  return {
    handleStartSession,
    isTokenValid,
    refreshToken,
  };
};

const containsNonNumeric = (inputString: string) => {
  const regex = /\D/;
  return regex.test(inputString);
};

export default useLogin;

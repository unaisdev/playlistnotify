import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize, refresh} from 'react-native-app-auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {
  ASYNC_STORAGE
} from '../../../constants';

const CLIENT_ID = 'df7cd23d00fe4f989f0eaeaa638f03cf';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const REVOKE_ENDPOINT = 'https://accounts.spotify.com/api/token';
const REDIRECT_URL = 'com.unaicanales.playlistnotify:/oauth';

// Endpoint
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
      const tokenExp = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION);
      console.log(tokenExp);
      if (tokenExp) {
        console.log(tokenExp);
        let expiration;

        if (containsNonNumeric(tokenExp)) {
          expiration = Date.parse(tokenExp) / 1000;
        } else {
          expiration = parseFloat(tokenExp);
        }

        const nowSeconds = Date.now() / 1000;
        console.log('expiration: ' + expiration);
        console.log('nowSeconds: ' + nowSeconds);

        return expiration && expiration >= nowSeconds; // Token is valid if it expires more than 60 seconds from now
      } else {
        console.log('No expiration token!');
        return false;
      }
    } catch (error) {
      console.log('Error checking token validity:', error);
      return false;
    }
  };

  const handleStartSession = useCallback(async () => {
    try {
      // Perform the authorization request
      const result = await authorize(config);

      if (result && result.accessToken) {
        const nowSeconds = Date.now() / 1000;
        const expiration =
          new Date(result.accessTokenExpirationDate).getTime() / 1000;
        console.log('accesstoken: ' + result.accessToken);
        console.log('token expires at: ' + expiration);
        console.log('refreshToken: ' + result.refreshToken);

        // Store the access token, expiration date and refresh token as strings
        await AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN, result.accessToken);
        await AsyncStorage.setItem(
          ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION,
          expiration.toString(),
        );
        await AsyncStorage.setItem(ASYNC_STORAGE.REFRESH_TOKEN, result.refreshToken);

        return true;
      }

      return false;
    } catch (error) {
      console.log('useLoging', error);
      return false;
    }
  }, []);

  const refreshToken = async () => {
    // Check if the access token is expired
    const tokenExp = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION);
    if (tokenExp) {
      let expiration;

      if (containsNonNumeric(tokenExp)) {
        expiration = Date.parse(tokenExp) / 1000;
      } else {
        expiration = parseFloat(tokenExp);
      }

      const nowSeconds = Date.now() / 1000;

      if (expiration && expiration <= nowSeconds) {
        // Access token is expired, try to refresh it
        const refreshToken = await AsyncStorage.getItem(
          ASYNC_STORAGE.REFRESH_TOKEN,
        );
        if (refreshToken) {
          try {
            const data = await refresh(config, {refreshToken});
            if (data && data.accessToken && data.refreshToken) {
              // Store the new access token and its expiration date
              await AsyncStorage.setItem(
                ASYNC_STORAGE.AUTH_TOKEN,
                data.accessToken,
              );
              await AsyncStorage.setItem(
                ASYNC_STORAGE.AUTH_TOKEN_EXPIRATION,
                data.accessTokenExpirationDate,
              );
              await AsyncStorage.setItem(ASYNC_STORAGE.REFRESH_TOKEN, data.refreshToken);
              console.log('Access token refreshed successfully.');
              console.log('New: ' + data.accessToken);
            }
          } catch (error) {
            console.log('Error refreshing access token:', error);
          }
        } else {
          console.log('No refresh token found.');
        }
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
  // Expresión regular para verificar si hay algún carácter que no sea un dígito numérico
  const regex = /\D/;

  return regex.test(inputString);
};

export default useLogin;

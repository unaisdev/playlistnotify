import axios from 'axios';
import {API_URL, ENCRYPTED_STORAGE, AUTH_CONFIG} from './constants';
import {refresh} from 'react-native-app-auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {triggerForbiddenError} from '@app/events/forbiddenError';

const HttpClient = axios.create();

HttpClient.defaults.baseURL = API_URL;

HttpClient.defaults.headers.common = {
  'Content-Type': 'application/json',
};

HttpClient.interceptors.request.use(async config => {
  if (!config.headers?.Authorization) {
    const auth = await EncryptedStorage.getItem(ENCRYPTED_STORAGE.AUTH_TOKEN);

    // console.log('auth');
    // console.log(auth);
    config.headers.Authorization = `Bearer ${auth}`;
  }

  return config;
});

// Interceptor para manejar errores de respuesta
HttpClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      const refreshToken = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE.REFRESH_TOKEN,
      );

      if (!refreshToken) return;
      // El token de acceso expiró o es inválido
      console.log('-----------------------------------------');
      console.log('El token de acceso ha expirado, hay que actualizarlo...');
      console.log('-----------------------------------------');

      const refreshed = await refresh(AUTH_CONFIG, {
        refreshToken: refreshToken,
      });

      console.log(refreshed);

      if (refreshed && refreshed.accessToken) {
        const nowSeconds = Date.now() / 1000;
        const expiration =
          new Date(refreshed.accessTokenExpirationDate).getTime() / 1000;

        console.log('access token:', refreshed.accessToken);
        console.log('token expires at:', expiration);
        console.log('refresh token:', refreshed.refreshToken);

        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE.AUTH_TOKEN,
          refreshed.accessToken,
        );
        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION,
          expiration.toString(),
        );

        // asdsdas
        if (!refreshed.refreshToken) return;

        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE.REFRESH_TOKEN,
          refreshed.refreshToken,
        );
      }
      console.log(refreshed.accessToken, 'refreshToken conseguido!');
    }

    if (error.response && error.response.status === 403) {
      const errorUrl = error.response.config.baseURL;

      if (errorUrl.includes('api.spotify.com')) {
        console.log('Error 403 de la API de Spotify detectado');
        await triggerForbiddenError();
      } else {
        console.log('Error 403 de otra API detectado');
      }
    }
    return Promise.reject(error);
  },
);

export default HttpClient;

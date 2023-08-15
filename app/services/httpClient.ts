import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL, ASYNC_STORAGE} from './constants';
import useLogin from '../screens/login/hooks/useLogin';

const HttpClient = axios.create();

HttpClient.defaults.baseURL = API_URL;

HttpClient.defaults.headers.common = {
  'Content-Type': 'application/json',
};

HttpClient.interceptors.request.use(async config => {
  if (!config.headers?.Authorization) {
    const auth = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);

    config.headers.Authorization = `Bearer ${auth}`;
  }

  return config;
});

// Interceptor para manejar errores de respuesta
HttpClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // El token de acceso expiró o es inválido
      console.log('-----------------------------------------');
      console.log('El token de acceso ha expirado, hay que actualizarlo...');

      console.log('-----------------------------------------');
    }
    return Promise.reject(error);
  },
);
export default HttpClient;

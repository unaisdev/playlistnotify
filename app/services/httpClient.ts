import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HttpClient = axios.create();

HttpClient.defaults.baseURL = "http://192.168.1.128:3000";

HttpClient.defaults.headers.common = {
  "Content-Type": "application/json",
};

HttpClient.interceptors.request.use(async (config) => {
  if (!config.headers?.Authorization) {
    const auth = await AsyncStorage.getItem("AccessToken");

    config.headers.Authorization = `Bearer ${auth}`;
  }

  return config;
});

export default HttpClient;

import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'test') return 'http://localhost';

  if (typeof apiUrl === 'object') return apiUrl[Platform.OS];

  return apiUrl;
};

// change before commit
export const baseURL = getBaseUrl() || 'http://localhost:3000';

const client = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export default client;

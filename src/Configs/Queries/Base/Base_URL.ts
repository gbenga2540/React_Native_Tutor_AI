import { API_BASE_URL_RLS, API_BASE_URL_DEV } from '@env';
import { Platform } from 'react-native';

export const base_url = __DEV__
    ? Platform.OS === 'android'
        ? API_BASE_URL_RLS
        : API_BASE_URL_DEV
    : API_BASE_URL_RLS;

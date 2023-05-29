import { API_BASE_URL_DEV_IOS, API_BASE_URL_DEV_ANDROID, API_BASE_URL_RLS } from '@env';
import { Platform } from 'react-native';

export const base_url = __DEV__ ? (Platform.OS === 'ios' ? API_BASE_URL_DEV_IOS : API_BASE_URL_DEV_ANDROID) : API_BASE_URL_RLS;

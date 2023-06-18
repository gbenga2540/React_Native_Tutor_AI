import { API_BASE_URL_RLS, API_BASE_URL_DEV } from '@env';

export const base_url = __DEV__ ? API_BASE_URL_DEV : API_BASE_URL_RLS;

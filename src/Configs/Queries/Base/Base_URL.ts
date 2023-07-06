import {
    API_BASE_URL_DEV_ANDROID_P,
    API_BASE_URL_DEV_IOS,
    API_BASE_URL_RLS_2,
} from '@env';
import { Platform } from 'react-native';

export const base_url = __DEV__
    ? Platform?.OS === 'ios'
        ? API_BASE_URL_DEV_IOS
        : API_BASE_URL_DEV_ANDROID_P
    : API_BASE_URL_RLS_2;

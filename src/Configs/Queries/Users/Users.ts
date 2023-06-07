import Axios from 'axios';
import { base_url } from '../Base/Base_URL';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const sign_up = async ({
    email,
    username,
    password,
    displayPicture,
}: {
    email: string;
    username: string;
    password: string;
    displayPicture: string;
}) => {
    return await api_base_url
        .post('auth/register', {
            email: email,
            username: username,
            password: password,
            dp: displayPicture,
        })
        ?.catch(err => {
            return {
                error: true,
                data: err?.message,
            };
        })
        ?.then((res: any) => {
            if (res?.status === 'error') {
                return {
                    error: true,
                    data: res?.data,
                };
            } else {
                if (res?.data?.status === 'success') {
                    return {
                        error: false,
                        data: res?.data?.response,
                    };
                } else {
                    return {
                        error: true,
                        data: 'An error occured. Please check your Internet Connectivity and try again!',
                    };
                }
            }
        });
};

export const sign_in = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    return await api_base_url
        .post('auth/login', {
            email: email,
            password: password,
        })
        ?.catch(err => {
            return {
                error: true,
                data: err?.message,
            };
        })
        ?.then((res: any) => {
            return {
                error: false,
                data: res,
            };
        });
};

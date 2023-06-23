import Axios from 'axios';
import { base_url } from '../Base/Base_URL';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const gpt_request = async ({ message }: { message: string }) => {
    return await api_base_url
        .post('chat', {
            message: message,
        })
        .catch(err => {
            return {
                error: true,
                data: err?.message,
            };
        })
        .then((res: any) => {
            if (res?.error) {
                return {
                    error: true,
                    data: res?.data,
                };
            } else {
                if (res?.data?.error) {
                    return {
                        error: true,
                        data: res?.data,
                    };
                } else {
                    return {
                        error: false,
                        data: res?.data,
                    };
                }
            }
        });
};

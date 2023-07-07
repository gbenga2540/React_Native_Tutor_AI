import Axios from 'axios';
import { base_url } from '../Base/Base_URL';
import { INTF_ChatGPT } from '../../../Interface/Chat_GPT/Chat_GPT';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const gpt_request = async ({
    messages,
}: {
    messages: INTF_ChatGPT[];
}) => {
    return await api_base_url
        .post('chat', {
            messages: messages,
        })
        .catch(err => {
            return {
                error: true,
                data: JSON.stringify(err?.response?.data || err?.message),
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

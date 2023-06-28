import Axios from 'axios';
import { base_url } from '../Base/Base_URL';
import { INTF_PaymentPlan } from '../../../Interface/Subscription/Subscription';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const stripe_intent = async ({
    userPlan,
    userAuth,
}: {
    userPlan: INTF_PaymentPlan;
    userAuth: string;
}) => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userAuth,
        },
    };
    return await api_base_url
        .post(
            'payment/stripe-intent',
            {
                userPlan: userPlan,
            },
            headersConfig,
        )
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

export const paypal_intent = async ({
    userPlan,
    userAuth,
}: {
    userPlan: INTF_PaymentPlan;
    userAuth: string;
}) => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userAuth,
        },
    };
    return await api_base_url
        .post(
            'payment/paypal-intent',
            {
                userPlan: userPlan,
            },
            headersConfig,
        )
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

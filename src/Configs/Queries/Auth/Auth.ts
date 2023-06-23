import Axios from 'axios';
import { base_url } from '../Base/Base_URL';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const register = async ({
    fullname,
    mobile,
    email,
    dob,
    displayPicture,
}: {
    fullname: string;
    mobile: string;
    email: string;
    dob: string;
    displayPicture: string;
}) => {
    return await api_base_url
        .post('auth/register', {
            fullname: fullname,
            mobile: mobile,
            email: email,
            dateOfBirth: dob,
            dp: displayPicture,
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

export const resend_otp = async ({ uid }: { uid: string }) => {
    return await api_base_url
        .post(`auth/token/resend/${uid}`)
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

export const verify_otp = async ({
    uid,
    otp,
}: {
    uid: string;
    otp: string;
}) => {
    return await api_base_url
        .post(`auth/token/verify/${uid}`, {
            otp: otp,
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

export const set_password = async ({
    uid,
    password,
}: {
    uid: string;
    password: string;
}) => {
    return await api_base_url
        .post(`auth/password/${uid}`, {
            password: password,
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

export const login = async ({
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

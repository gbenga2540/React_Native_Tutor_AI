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

export const forgot_password = async ({ email }: { email: string }) => {
    return await api_base_url
        .post('user/forgot-password', {
            email: email,
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

export const change_password = async ({
    uid,
    oldPassword,
    newPassword,
}: {
    uid: string;
    oldPassword: string;
    newPassword: string;
}) => {
    return await api_base_url
        .patch(`user/change-password/${uid}`, {
            old: oldPassword,
            password: newPassword,
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

export const update_user_info = async ({
    uid,
    dateOfBirth,
    email,
    fullname,
    mobile,
    language,
}: {
    uid: string;
    dateOfBirth: string;
    email: string;
    fullname: string;
    mobile: string;
    language: string;
}) => {
    return await api_base_url
        .patch(`user/${uid}`, {
            dateOfBirth: dateOfBirth,
            email: email,
            fullname: fullname,
            mobile: mobile,
            language: language,
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

export const update_misc = async ({
    uid,
    language,
    study_target,
    interests,
}: {
    uid: string;
    language: string;
    study_target: number;
    interests: string[];
}) => {
    return await api_base_url
        .post(`user/language/${uid}`, {
            language: language,
            study_target: study_target,
            interests: interests,
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

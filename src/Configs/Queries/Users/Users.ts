import Axios from 'axios';
import { base_url } from '../Base/Base_URL';
import { INTF_AssignedClass } from '../../../Interface/Assigned_Class/Assigned_Class';

const api_base_url = Axios.create({
    baseURL: base_url,
});

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

export const update_level = async ({
    uid,
    level,
}: {
    uid: string;
    level: INTF_AssignedClass;
}) => {
    if (level !== null) {
        return await api_base_url
            .patch(`user/update-level/${uid}`, {
                level: level,
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
    } else {
        return {
            error: true,
            data: 'Assigned Level to be Updated is Null!',
        };
    }
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

export const update_dp = async ({
    uid,
    displayPicture,
}: {
    uid: string;
    displayPicture: string;
}) => {
    return await api_base_url
        .patch(`user/update-pic/${uid}`, {
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

export const increase_lessons = async ({
    userAuth,
    noOfLessons,
}: {
    noOfLessons: number;
    userAuth: string;
}) => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userAuth,
        },
    };
    return await api_base_url
        .put(
            'user/increase',
            {
                no_of_lessons: noOfLessons,
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

export const delete_account = async ({ userAuth }: { userAuth: string }) => {
    return await api_base_url
        .delete('user/delete', {
            headers: {
                authorization: userAuth,
            },
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

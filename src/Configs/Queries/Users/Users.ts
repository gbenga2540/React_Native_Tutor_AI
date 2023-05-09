import Axios from 'axios';
import { base_url } from '../Base/Base_URL';
import { error_translator } from '../../../Utils/Error_Converter/Error_Converter';

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
        .post('users/auth/signup', {
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
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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
        .post('users/auth/signin', {
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
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const send_email_ver = async ({
    user_token,
}: {
    user_token: string;
}) => {
    return await api_base_url
        .patch('users/verifymail/send', {
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const confirm_email = async ({
    user_token,
    otp,
}: {
    user_token: string;
    otp: string;
}) => {
    return await api_base_url
        .patch('users/verifymail/confirm', {
            otp: otp,
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const forgot_password = async ({ email }: { email: string }) => {
    return await api_base_url
        .patch('users/forgotpassword', {
            email: email,
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const change_password = async ({
    user_token,
    oldPassword,
    newPassword,
}: {
    user_token: string;
    oldPassword: string;
    newPassword: string;
}) => {
    return await api_base_url
        .patch('users/resetpassword', {
            oldpassword: oldPassword,
            newpassword: newPassword,
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const update_username = async ({
    user_token,
    username,
}: {
    user_token: string;
    username: string;
}) => {
    return await api_base_url
        .patch('users/updateusername', {
            username: username,
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const update_display_picture = async ({
    user_token,
    displayPicture,
}: {
    user_token: string;
    displayPicture: string;
}) => {
    return await api_base_url
        .patch('users/updatedp', {
            dp: displayPicture,
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const follow_author = async ({
    user_token,
    authorID,
}: {
    user_token: string;
    authorID: string;
}) => {
    return await api_base_url
        .patch('users/follow', {
            aid: authorID,
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const unfollow_author = async ({
    user_token,
    authorID,
}: {
    user_token: string;
    authorID: string;
}) => {
    return await api_base_url
        .patch('users/unfollow', {
            aid: authorID,
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const delete_account = async ({
    user_token,
}: {
    user_token: string;
}) => {
    return await api_base_url
        .delete('users/delete', {
            headers: {
                'x-access-token': user_token,
            },
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
                        data: 'success',
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const get_author_followers = async ({
    user_token,
    authorID,
    paginationIndex,
}: {
    user_token?: string;
    authorID: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(
            `users/${authorID}/followers?pagination_index=${
                paginationIndex || 0
            }`,
            {
                headers: {
                    'x-access-token': user_token ? user_token : '',
                },
            },
        )
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
                        data: [...res?.data?.response],
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const get_author_following = async ({
    user_token,
    authorID,
    paginationIndex,
}: {
    user_token?: string;
    authorID: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(
            `users/${authorID}/following?pagination_index=${
                paginationIndex || 0
            }`,
            {
                headers: {
                    'x-access-token': user_token ? user_token : '',
                },
            },
        )
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
                        data: [...res?.data?.response],
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const get_author_blogs = async ({
    user_token,
    authorID,
    paginationIndex,
}: {
    user_token?: string;
    authorID: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(
            `users/${authorID}/blogs?pagination_index=${paginationIndex || 0}`,
            {
                headers: {
                    'x-access-token': user_token ? user_token : '',
                },
            },
        )
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
                        data: [...res?.data?.response],
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const get_author_info = async ({
    user_token,
    authorID,
}: {
    user_token?: string;
    authorID: string;
}) => {
    return await api_base_url
        .get(`users/${authorID}`, {
            headers: {
                'x-access-token': user_token ? user_token : '',
            },
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
                        data: { ...res?.data?.response },
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

export const get_authors = async ({
    user_token,
    search,
    paginationIndex,
}: {
    user_token?: string;
    search: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(
            `users?search=${search || ''}&pagination_index=${
                paginationIndex || 0
            }`,
            {
                headers: {
                    'x-access-token': user_token ? user_token : '',
                },
            },
        )
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
                        data: [...res?.data?.response],
                    };
                } else if (res?.data?.status === 'error') {
                    return {
                        error: true,
                        data: `Error: ${error_translator({
                            code: res?.data?.code,
                        })}`,
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

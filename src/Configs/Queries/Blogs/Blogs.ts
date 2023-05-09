import Axios from 'axios';
import { base_url } from '../Base/Base_URL';
import { error_translator } from '../../../Utils/Error_Converter/Error_Converter';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const create_blog = async ({
    user_token,
    title,
    message,
    displayPicture,
    tags,
}: {
    user_token: string;
    title: string;
    message: string;
    displayPicture: string;
    tags?: number[];
}) => {
    return await api_base_url
        .post('blogs/create', {
            title: title,
            message: message,
            dp: displayPicture,
            tags: tags || [],
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

export const edit_blog = async ({
    user_token,
    blogID,
    title,
    message,
    displayPicture,
    tags,
}: {
    user_token: string;
    blogID: string;
    title: string;
    message: string;
    displayPicture: string;
    tags: number[];
}) => {
    return await api_base_url
        .patch('blogs/edit', {
            bid: blogID,
            title: title,
            message: message,
            dp: displayPicture,
            tags: tags,
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

export const delete_blog = async ({
    user_token,
    blogID,
}: {
    user_token: string;
    blogID: string;
}) => {
    return await api_base_url
        .delete('blogs/delete', {
            headers: {
                'x-access-token': user_token,
                bid: blogID,
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

export const like_blog = async ({
    user_token,
    blogID,
}: {
    user_token: string;
    blogID: string;
}) => {
    return await api_base_url
        .patch('blogs/like', {
            bid: blogID,
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

export const dislike_blog = async ({
    user_token,
    blogID,
}: {
    user_token: string;
    blogID: string;
}) => {
    return await api_base_url
        .patch('blogs/dislike', {
            bid: blogID,
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

export const create_comment = async ({
    user_token,
    blogID,
    comment,
}: {
    user_token: string;
    blogID: string;
    comment: string;
}) => {
    return await api_base_url
        .patch('blogs/comment/create', {
            bid: blogID,
            comment: comment,
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

export const edit_comment = async ({
    user_token,
    blogID,
    commentID,
    comment,
}: {
    user_token: string;
    blogID: string;
    commentID: string;
    comment: string;
}) => {
    return await api_base_url
        .patch('blogs/comment/edit', {
            bid: blogID,
            cid: commentID,
            comment: comment,
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

export const delete_comment = async ({
    user_token,
    blogID,
    commentID,
}: {
    user_token: string;
    blogID: string;
    commentID: string;
}) => {
    return await api_base_url
        .patch('blogs/comment/delete', {
            bid: blogID,
            cid: commentID,
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

export const get_foryou_blogs = async ({
    user_token,
    paginationIndex,
}: {
    user_token: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(`blogs/foryou?pagination_index=${paginationIndex || 0}`, {
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

export const get_trending_blogs = async ({
    user_token,
    paginationIndex,
}: {
    user_token?: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(`blogs/trending?pagination_index=${paginationIndex || 0}`, {
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

export const get_blog_likes = async ({
    user_token,
    blogID,
    paginationIndex,
}: {
    user_token?: string;
    blogID: string;
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(`blogs/${blogID}/likes?pagination_index=${paginationIndex || 0}`, {
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

export const get_blog_info = async ({
    user_token,
    blogID,
}: {
    user_token?: string;
    blogID: string;
}) => {
    return await api_base_url
        .get(`blogs/${blogID}`, {
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

export const get_blogs = async ({
    user_token,
    search,
    tags,
    paginationIndex,
}: {
    user_token?: string;
    search?: string;
    tags?: number[];
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(
            `blogs/?search=${search || ''}&tags=${
                JSON.stringify(tags) || '[]'
            }&pagination_index=${paginationIndex || 0}`,
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

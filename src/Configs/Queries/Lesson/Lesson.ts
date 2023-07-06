import Axios from 'axios';
import { base_url } from '../Base/Base_URL';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const activate_lesson = async ({
    userId,
    lessonId,
}: {
    userId: string;
    lessonId: number;
}) => {
    return await api_base_url
        .patch('lesson/activate', {
            user_id: userId,
            lesson_id: lessonId,
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

export const set_homework_score = async ({
    userAuth,
    lessonId,
    lessonScore,
}: {
    userAuth: string;
    lessonId: number;
    lessonScore: number;
}) => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userAuth,
        },
    };
    return await api_base_url
        .patch(
            'lesson/hw-score',
            {
                lesson_id: lessonId,
                lesson_score: lessonScore,
            },
            headersConfig,
        )
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

export const set_exam_score = async ({
    userAuth,
    examLevel,
    examScore,
}: {
    userAuth: string;
    examLevel: number;
    examScore: number;
}) => {
    const headersConfig = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userAuth,
        },
    };
    return await api_base_url
        .patch(
            'lesson/exam-score',
            {
                exam_lvl: examLevel,
                exam_score: examScore,
            },
            headersConfig,
        )
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

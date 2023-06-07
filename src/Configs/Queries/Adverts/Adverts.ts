import Axios from 'axios';
import { base_url } from '../Base/Base_URL';
import { error_translator } from '../../../Utils/Error_Converter/Error_Converter';

const api_base_url = Axios.create({
    baseURL: base_url,
});

export const get_adverts = async ({
    paginationIndex,
}: {
    paginationIndex?: number;
}) => {
    return await api_base_url
        .get(
            paginationIndex
                ? `adverts?pagination_index=${paginationIndex}`
                : 'adverts',
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

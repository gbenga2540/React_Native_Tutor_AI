import { number_to_month } from '../Number_To_Month/Number_To_Month';

export const mongo_date_converter_1 = ({
    input_mongo_date,
}: {
    input_mongo_date: string;
}) => {
    if (input_mongo_date) {
        const _date = new Date(input_mongo_date);
        const date = _date.getDate();
        const month = _date.getMonth() + 1;
        const year = _date.getFullYear();
        return `${number_to_month({ month_number: month }).slice(
            0,
            3,
        )} ${date}, ${year}`;
    } else {
        return '';
    }
};

export const mongo_date_converter_2 = ({
    input_mongo_date,
}: {
    input_mongo_date: string;
}) => {
    if (input_mongo_date) {
        const _date = new Date(input_mongo_date);
        const date = _date.getDate();
        const month = _date.getMonth() + 1;
        const year = _date.getFullYear();
        return `${number_to_month({ month_number: month })} ${date}, ${year}`;
    } else {
        return '';
    }
};

export const mongo_date_converter_3 = ({
    input_mongo_date,
}: {
    input_mongo_date: string;
}) => {
    if (input_mongo_date) {
        const _date = new Date(input_mongo_date);
        const date = _date.getDate();
        const month = _date.getMonth() + 1;
        const year = _date.getFullYear();
        return `${number_to_month({ month_number: month })?.slice(
            0,
            3,
        )} ${date}, ${year}`;
    } else {
        return '';
    }
};

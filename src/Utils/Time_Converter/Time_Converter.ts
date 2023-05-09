import TimeAgo from 'javascript-time-ago';
import { number_to_month } from '../Number_To_Month/Number_To_Month';

const timeAgo = new TimeAgo('en-US');

export const getCustomTimeAgo = ({ date_string }: { date_string: string }) => {
    const input_date = new Date(date_string)?.getTime();
    const time_ago = timeAgo.format(parseInt(input_date?.toString(), 10));
    return time_ago;
};

export const getCustomDate = ({ date_string }: { date_string: string }) => {
    const input_date = new Date(date_string);
    const day = input_date?.getDate();
    const month = input_date?.getMonth();
    const processed_month = number_to_month({ month_number: month });
    const year = input_date?.getFullYear();
    const date = `${day} ${processed_month} ${year}`;
    return date;
};

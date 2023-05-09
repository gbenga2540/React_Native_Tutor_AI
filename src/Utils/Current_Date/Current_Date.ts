import { number_to_month } from '../Number_To_Month/Number_To_Month';
import { number_to_day } from '../Number_To_Day/Number_To_Day';

export const current_date = () => {
    const date = new Date();
    return {
        date: date.getDate(),
        day: number_to_day({ day_number: date.getDay() }),
        month: number_to_month({ month_number: date.getMonth() + 1 }),
        merged_date: `${number_to_day({
            day_number: date.getDay(),
        })}, ${date.getDate()} ${number_to_month({
            month_number: date.getMonth() + 1,
        })}`,
    };
};

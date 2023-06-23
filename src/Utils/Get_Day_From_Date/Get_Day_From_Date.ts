export const get_day_from_date = ({ input_date }: { input_date: Date }) => {
    if (input_date) {
        const _date = new Date(input_date);
        const date = _date.getDay();
        return date + 1; // Zero-Indexed + 1
    } else {
        return 1; // Sunday
    }
};

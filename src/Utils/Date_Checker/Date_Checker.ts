export const regex_date_checker = ({ date }: { date: string }) => {
    const validator = /^\d{2}-\d{2}-\d{4}$/;
    return validator.test(date);
};

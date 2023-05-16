export const get_age = ({ input_date }: { input_date: string }) => {
    if (input_date) {
        const birthdateObj: any = new Date(input_date);
        const now: any = new Date();
        const age_in_ms = now - birthdateObj;
        const age_in_years = age_in_ms / (365 * 24 * 60 * 60 * 1000);
        const age = Math.floor(age_in_years);
        return age;
    } else {
        return '';
    }
};

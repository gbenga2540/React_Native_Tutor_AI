export const number_to_day_short = ({ day_number }: { day_number: number }) => {
    switch (day_number) {
        case 1:
            return 'Sun';
        case 2:
            return 'Mon';
        case 3:
            return 'Tue';
        case 4:
            return 'Wed';
        case 5:
            return 'Thu';
        case 6:
            return 'Fri';
        case 7:
            return 'Sat';
        default:
            return 'Sun';
    }
};

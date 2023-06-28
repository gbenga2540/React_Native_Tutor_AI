export const get_next_date_of_week = ({
    day,
}: {
    day:
        | 'Sunday'
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday';
}) => {
    const dayOfWeek =
        day === 'Sunday'
            ? 0
            : day === 'Monday'
            ? 1
            : day === 'Tuesday'
            ? 2
            : day === 'Wednesday'
            ? 3
            : day === 'Thursday'
            ? 4
            : day === 'Friday'
            ? 5
            : 6;

    const today = new Date();
    const targetDay = dayOfWeek % 7;
    const currentDay = today.getDay();
    const daysUntilTarget = (targetDay + 7 - currentDay) % 7;
    const nextDate = new Date(
        today.getTime() + daysUntilTarget * 24 * 60 * 60 * 1000,
    );

    return { day: nextDate.getDate().toString(), date: nextDate };
};

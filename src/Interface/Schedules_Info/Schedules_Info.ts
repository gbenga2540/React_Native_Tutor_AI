export type INTF_ScheduleDays =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

export interface INTF_SchedulesInfo {
    title?: string;
    day: INTF_ScheduleDays;
    repeat?: boolean;
    time?: Date;
}

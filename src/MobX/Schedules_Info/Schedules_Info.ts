import { action, makeObservable, observable } from 'mobx';
import {
    INTF_ScheduleDays,
    INTF_SchedulesInfo,
} from '../../Interface/Schedules_Info/Schedules_Info';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_SCHEDULE_INFO } from '@env';
import {
    clearNotifications,
    scheduleShowNotification,
} from '../../Notifications/Notification';

const handle_notifications = ({
    schedule,
}: {
    schedule: INTF_SchedulesInfo[];
}) => {
    clearNotifications();
    schedule.map(item => {
        if (item.title && item.time) {
            scheduleShowNotification({
                title: 'Tutor AI',
                message: `You have set a Reminder for ${item.title}. Click this Notification to Open the App!`,
                repeat: item.repeat || false,
                time: new Date(new Date(item.time).getTime() - 60 * 60 * 1000),
            });
        } else {
            return;
        }
    });
};

const save_schedule = async ({
    schedule,
}: {
    schedule: INTF_SchedulesInfo[];
}) => {
    try {
        await SInfo.setItem(
            SECURE_STORAGE_SCHEDULE_INFO,
            JSON.stringify([...schedule]),
            {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            },
        )
            .catch(() => {
                handle_notifications({ schedule: schedule });
            })
            .then(() => {
                handle_notifications({ schedule: schedule });
            });
    } catch (error) {
        handle_notifications({ schedule: schedule });
    }
};

class ScheduleInfoClass {
    schedule_info: INTF_SchedulesInfo[] = [
        {
            day: 'Sunday',
            repeat: false,
        },
        {
            day: 'Monday',
            repeat: false,
        },
        {
            day: 'Tuesday',
            repeat: false,
        },
        {
            day: 'Wednesday',
            repeat: false,
        },
        {
            day: 'Thursday',
            repeat: false,
        },
        {
            day: 'Friday',
            repeat: false,
        },
        {
            day: 'Saturday',
            repeat: false,
        },
    ];

    constructor() {
        makeObservable(this, {
            schedule_info: observable,
            add_to_schedule: action,
            enable_or_disable_repeat: action,
            delete_schedule: action,
            set_schedule_info: action,
            clear_schedule_info: action,
        });
    }

    add_to_schedule = ({
        day,
        title,
        time,
    }: {
        day: INTF_ScheduleDays;
        title: string;
        time: Date;
    }) => {
        const temp_schedule: INTF_SchedulesInfo[] = [
            ...this.schedule_info.map(item => {
                if (item.day === day) {
                    return {
                        day: day,
                        title: title,
                        time: new Date(time),
                        repeat: false,
                    };
                }
                return { ...item };
            }),
        ];
        this.schedule_info = [...temp_schedule];
        save_schedule({ schedule: [...temp_schedule] });
    };

    enable_or_disable_repeat = ({
        day,
        repeat,
    }: {
        day: INTF_ScheduleDays;
        repeat: boolean;
    }) => {
        const temp_schedule: INTF_SchedulesInfo[] = [
            ...this.schedule_info.map(item => {
                if (item.day === day) {
                    return {
                        ...item,
                        repeat: repeat,
                    };
                }
                return { ...item };
            }),
        ];
        this.schedule_info = [...temp_schedule];
        save_schedule({ schedule: [...temp_schedule] });
    };

    delete_schedule = ({ day }: { day: INTF_ScheduleDays }) => {
        const temp_schedule: INTF_SchedulesInfo[] = [
            ...this.schedule_info.map(item => {
                if (item.day === day) {
                    return {
                        day: day,
                        repeat: false,
                    };
                }
                return { ...item };
            }),
        ];

        this.schedule_info = [...temp_schedule];
        save_schedule({ schedule: [...temp_schedule] });
    };

    set_schedule_info = ({ schedule }: { schedule: INTF_SchedulesInfo[] }) => {
        const temp_schedule: INTF_SchedulesInfo[] = [...schedule];

        this.schedule_info = [...temp_schedule];
        save_schedule({ schedule: [...temp_schedule] });
    };

    clear_schedule_info = () => {
        const temp_schedule: INTF_SchedulesInfo[] = [
            {
                day: 'Sunday',
                repeat: false,
            },
            {
                day: 'Monday',
                repeat: false,
            },
            {
                day: 'Tuesday',
                repeat: false,
            },
            {
                day: 'Wednesday',
                repeat: false,
            },
            {
                day: 'Thursday',
                repeat: false,
            },
            {
                day: 'Friday',
                repeat: false,
            },
            {
                day: 'Saturday',
                repeat: false,
            },
        ];

        this.schedule_info = [...temp_schedule];
        save_schedule({ schedule: [...temp_schedule] });
    };
}

export const ScheduleInfoStore = new ScheduleInfoClass();

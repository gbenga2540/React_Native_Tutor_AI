import { SECURE_STORAGE_NAME, SECURE_STORAGE_SCHEDULE_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { INTF_SchedulesInfo } from '../../Interface/Schedules_Info/Schedules_Info';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';

const SetClassSchedule = async () => {
    try {
        await SInfo.getItem(SECURE_STORAGE_SCHEDULE_INFO, {
            sharedPreferencesName: SECURE_STORAGE_NAME,
            keychainService: SECURE_STORAGE_NAME,
        })?.then(async res => {
            if (res?.length > 0) {
                const json_res: INTF_SchedulesInfo[] = JSON.parse(res);
                const new_schedule: INTF_SchedulesInfo[] = json_res.map(
                    item => {
                        if (item?.time) {
                            if (
                                new Date(item.time).getTime() <=
                                new Date(Date.now()).getTime()
                            ) {
                                if (item.repeat) {
                                    return { ...item };
                                } else {
                                    return { day: item.day, repeat: false };
                                }
                            } else {
                                return { ...item };
                            }
                        } else {
                            return { ...item };
                        }
                    },
                );
                ScheduleInfoStore.set_schedule_info({
                    schedule: new_schedule,
                });
            } else {
                ScheduleInfoStore.clear_schedule_info();
            }
        });
    } catch (error) {}
};

export { SetClassSchedule };

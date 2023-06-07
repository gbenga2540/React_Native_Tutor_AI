import { SECURE_STORAGE_NAME, SECURE_STORAGE_SCHEDULE_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { INTF_SchedulesInfo } from '../../Interface/Schedules_Info/Schedules_Info';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { sort_schedule } from '../../Utils/Sort_Schedule/Sort_Schedule';

const SetClassSchedule = async () => {
    try {
        await SInfo.getItem(SECURE_STORAGE_SCHEDULE_INFO, {
            sharedPreferencesName: SECURE_STORAGE_NAME,
            keychainService: SECURE_STORAGE_NAME,
        })?.then(async res => {
            if (res) {
                const json_res: INTF_SchedulesInfo[] = JSON.parse(res);
                ScheduleInfoStore.set_schedule_info({
                    schedule: sort_schedule({ schedule: json_res }),
                });
            }
        });
    } catch (error) {}
};

export { SetClassSchedule };

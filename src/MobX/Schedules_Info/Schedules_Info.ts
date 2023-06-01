import { action, makeObservable, observable } from 'mobx';
import { INTF_SchedulesInfo } from '../../Interface/Schedules_Info/Schedules_Info';
import { sort_schedule } from '../../Utils/Sort_Schedule/Sort_Schedule';

class ScheduleInfoClass {
    schedule_info: INTF_SchedulesInfo[] = [];
    edit_index: number = 0;

    constructor() {
        makeObservable(this, {
            schedule_info: observable,
            edit_index: observable,
            add_to_schedule: action,
            edit_schedule: action,
            delete_schedule: action,
            set_schedule_info: action,
            set_edit_index: action,
        });
    }

    add_to_schedule = ({ schedule }: { schedule: INTF_SchedulesInfo }) => {
        this.schedule_info = sort_schedule({
            schedule: [...this.schedule_info, schedule],
        });
    };

    edit_schedule = ({ schedule }: { schedule: INTF_SchedulesInfo }) => {
        this.schedule_info = sort_schedule({
            schedule: [
                ...this.schedule_info.map((item, index) => {
                    if (this.edit_index === index) {
                        return {
                            title: schedule.title,
                            time: new Date(schedule.time),
                        };
                    }
                    return { ...item };
                }),
            ],
        });
    };

    delete_schedule = () => {
        this.schedule_info = sort_schedule({
            schedule: [
                ...this.schedule_info.filter(
                    (item, index) => index !== this.edit_index,
                ),
            ],
        });
    };

    set_schedule_info = ({ schedule }: { schedule: INTF_SchedulesInfo[] }) => {
        this.schedule_info = sort_schedule({ schedule: [...schedule] });
    };

    set_edit_index = ({ index }: { index: number }) => {
        this.edit_index = index;
    };
}

export const ScheduleInfoStore = new ScheduleInfoClass();

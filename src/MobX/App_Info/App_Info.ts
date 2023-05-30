import { action, makeObservable, observable } from 'mobx';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';

class AppInfoClass {
    app_list: INTF_AppInfo[] = [];

    constructor() {
        makeObservable(this, {
            app_list: observable,
            set_app_list: action,
        });
    }

    set_app_list = ({ app_list }: { app_list: INTF_AppInfo[] }) => {
        this.app_list = app_list;
    };
}

export const AppInfoStore = new AppInfoClass();

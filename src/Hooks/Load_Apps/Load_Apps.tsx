import { NativeModules } from 'react-native';
import { AppInfoStore } from '../../MobX/App_Info/App_Info';
import { sort_apps_by_name } from '../../Utils/Sort_Apps_By_Name/Sort_Apps_By_Name';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';

const GetInstalledApps = async () => {
    const all_installed_apps: INTF_AppInfo[] =
        await NativeModules.MyAppInfoModule.getAllInstalledApps();
    if (all_installed_apps?.length > 0) {
        const sorted_apps = sort_apps_by_name({
            app_list: all_installed_apps,
        });
        AppInfoStore.set_app_list({
            app_list: sorted_apps,
        });
    }
};

export { GetInstalledApps };

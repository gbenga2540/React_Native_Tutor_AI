import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';

export const sort_apps_by_name = ({
    app_list,
}: {
    app_list: INTF_AppInfo[];
}): INTF_AppInfo[] => {
    app_list.sort((a, b) => {
        const nameA = a?.name?.toUpperCase() || '';
        const nameB = b?.name?.toUpperCase() || '';

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return app_list;
};

import { action, makeObservable, observable } from 'mobx';
import { INTF_UserInfo } from '../../Interface/User_Info/User_Info';

class UserInfoClass {
    user_info: INTF_UserInfo = {};

    constructor() {
        makeObservable(this, {
            user_info: observable,
            set_user_info: action,
            clear_user_info: action,
        });
    }

    set_user_info = ({ user_info }: { user_info: INTF_UserInfo }) => {
        this.user_info = user_info;
    };

    clear_user_info = () => {
        this.user_info = {};
    };
}

export const UserInfoStore = new UserInfoClass();

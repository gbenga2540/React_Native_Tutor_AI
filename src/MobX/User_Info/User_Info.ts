import { action, makeObservable, observable } from 'mobx';
import { INTF_UserInfo } from '../../Interface/User_Info/User_Info';

class UserInfoClass {
    user_info: INTF_UserInfo = {
        email_v: false,
        token: '',
        uid: '',
    };

    constructor() {
        makeObservable(this, {
            user_info: observable,
            set_user_info: action,
            clear_user_info: action,
        });
    }

    set_user_info = ({ data }: { data?: INTF_UserInfo }) => {
        this.user_info = data as INTF_UserInfo;
    };

    clear_user_info = () => {
        this.user_info = {
            email_v: false,
            token: '',
            uid: '',
        };
    };
}

export const UserInfoStore = new UserInfoClass();

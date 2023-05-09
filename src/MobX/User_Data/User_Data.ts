import { action, makeObservable, observable } from 'mobx';
import { INTF_UserData } from '../../Interface/User_Data/User_Data';

class UserDataClass {
    user_data: INTF_UserData = {
        blogs_l: 0,
        createdAt: '',
        dp_link: '',
        followed: false,
        followers_l: 0,
        following_l: 0,
        isowner: false,
        uid: '',
        username: '',
        verified: false,
    };

    constructor() {
        makeObservable(this, {
            user_data: observable,
            set_user_data: action,
            clear_user_data: action,
            update_user_name: action,
        });
    }

    set_user_data = ({ data }: { data?: INTF_UserData }) => {
        this.user_data = data as INTF_UserData;
    };

    clear_user_data = () => {
        this.user_data = {
            blogs_l: 0,
            createdAt: '',
            dp_link: '',
            followed: false,
            followers_l: 0,
            following_l: 0,
            isowner: false,
            uid: '',
            username: '',
            verified: false,
        };
    };

    update_user_name = ({ username }: { username: string }) => {
        this.user_data = {
            ...this.user_data,
            username: username,
        };
    };
}

export const UserDataStore = new UserDataClass();

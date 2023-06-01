import { INTF_ProfileMenu } from '../../Interface/Profile_Menu/Profile_Menu';

export const profile_menu_1: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Personal Details',
        stack: 'HomeStack',
        screen: 'PersonalDetailsPage',
        params: {},
    },
    {
        id: 2,
        name: 'Avatar Customization',
        stack: 'HomeStack',
        screen: 'AvatarCustomizationPage',
        params: {},
    },
    {
        id: 3,
        name: 'Schedule Next Class',
        stack: 'HomeStack',
        screen: 'ScheduleClassPage',
        params: {},
    },
];

export const profile_menu_2: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Subscription Plans ',
        stack: 'HomeStack',
        screen: 'SubscriptionPage',
        params: {},
    },
];

export const profile_menu_3: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Parental Control',
        stack: 'HomeStack',
        screen: 'ParentalControlPage',
        params: {},
    },
    {
        id: 2,
        name: 'Change Password',
        stack: 'AuthStack',
        screen: 'ChangePasswordPage',
        params: {},
    },
];

export const profile_menu_4: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Help Center',
        stack: 'HomeStack',
        screen: 'HelpCenterPage',
        params: {},
    },
    {
        id: 2,
        name: 'Terms and Conditions ',
        stack: 'AuthStack',
        screen: 'TCPage',
        params: {},
    },
    {
        id: 3,
        name: 'Contact us',
        stack: 'HomeStack',
        screen: 'HelpCenterPage',
        params: {
            is_contact_page: true,
        },
    },
    {
        id: 4,
        name: 'Sign Out',
        stack: 'InfoPage',
        screen: '',
        params: {
            success_mssg: 'Are you sure you want to sign out?',
            svr_success_mssg: '',
            proceed_type: 1,
            hide_back_btn: false,
            hide_header: true,
        },
    },
];

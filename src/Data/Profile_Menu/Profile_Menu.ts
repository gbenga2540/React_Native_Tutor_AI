import { INTF_ProfileMenu } from '../../Interface/Profile_Menu/Profile_Menu';

export const profile_menu_1: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Personal Details',
        stack: 'HomeStack',
        screen: '',
    },
    {
        id: 2,
        name: 'Avatar Customization',
        stack: 'HomeStack',
        screen: '',
    },
];

export const profile_menu_2: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Subscription Plans ',
        stack: 'HomeStack',
        screen: 'SubscriptionPage',
    },
];

export const profile_menu_3: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Parental Control',
        stack: 'HomeStack',
        screen: 'ParentalControlPage',
    },
    {
        id: 2,
        name: 'Change Password',
        stack: 'AuthStack',
        screen: 'ChangePasswordPage',
    },
];

export const profile_menu_4: INTF_ProfileMenu[] = [
    {
        id: 1,
        name: 'Help Center',
        stack: 'HomeStack',
        screen: '',
    },
    {
        id: 2,
        name: 'Terms and Conditions ',
        stack: 'AuthStack',
        screen: 'TCPage',
    },
    {
        id: 3,
        name: 'Contact us',
        stack: 'HomeStack',
        screen: '',
    },
];

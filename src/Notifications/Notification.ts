import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const pushShowNotification = ({
    title,
    message,
}: {
    title: string;
    message: string;
}) => {
    if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
            title: title,
            body: message,
            id: 'TutorAI',
        });
    } else {
        PushNotification.localNotification({
            title: title,
            message: message,
            channelId: 'TutorAI',
            largeIcon: 'ic_launcher',
            bigLargeIcon: 'ic_launcher',
            smallIcon: 'ic_launcher',
        });
    }
};

export const scheduleShowNotification = ({
    title,
    message,
    time,
    repeat,
}: {
    title: string;
    message: string;
    time: Date;
    repeat: boolean;
}) => {
    if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
            title: title,
            body: message,
            id: 'TutorAI',
            fireDate: time,
            repeats: repeat,
            repeatsComponent: {
                // dayOfWeek: true,
                second: true,
            },
        });
    } else {
        PushNotification.localNotificationSchedule({
            title: title,
            message: message,
            channelId: 'TutorAI',
            date: time,
            largeIcon: 'ic_launcher',
            bigLargeIcon: 'ic_launcher',
            smallIcon: 'ic_launcher',
            repeatType: repeat ? 'week' : undefined,
        });
    }
};

export const clearNotifications = () => {
    if (Platform.OS === 'ios') {
        PushNotificationIOS.removeAllPendingNotificationRequests();
        PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
        PushNotification.cancelAllLocalNotifications();
    }
};

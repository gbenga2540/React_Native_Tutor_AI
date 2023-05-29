import { Linking } from 'react-native';

export const open_browser_with_link = async ({ url }: { url: string }) => {
    try {
        await Linking.openURL(url);
    } catch (error) {}
};

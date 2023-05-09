import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ErrorHandlerProps {
    navigation: NativeStackNavigationProp<any>;
    error_mssg: string;
    svr_error_mssg?: string;
}

export const error_handler = ({
    navigation,
    error_mssg,
    svr_error_mssg,
}: ErrorHandlerProps) => {
    navigation.push(
        'ErrorPage' as never,
        {
            error_mssg: error_mssg,
            svr_error_mssg: svr_error_mssg,
        } as never,
    );
};

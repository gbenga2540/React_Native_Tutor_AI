import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface InfoHandlerProps {
    navigation: NativeStackNavigationProp<any>;
    success_mssg: string;
    svr_success_mssg?: string;
    proceed_type: number;
    hide_back_btn?: boolean;
    hide_header?: boolean;
}

export const info_handler = ({
    navigation,
    success_mssg,
    svr_success_mssg,
    proceed_type,
    hide_back_btn,
    hide_header,
}: InfoHandlerProps) => {
    navigation.push(
        'InfoPage' as never,
        {
            success_mssg: success_mssg,
            svr_success_mssg: svr_success_mssg,
            proceed_type: proceed_type,
            hide_back_btn: hide_back_btn || false,
            hide_header: hide_header || false,
        } as never,
    );
};

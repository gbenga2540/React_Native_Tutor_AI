import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';
import BasicText from '../Basic_Text/Basic_Text';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface AppInfoProps {
    app: INTF_AppInfo;
}
const AppInfo: FunctionComponent<AppInfoProps> = ({ app }) => {
    const enable_disable_app = no_double_clicks({
        execFunc: async () => {
            // if (app?.isEnabled) {
            //     try {
            //         await NativeModules.MyAppHideModule.myHideApp(app?.bundleID)
            //             .then((res: any) => console.log(res))
            //             .catch((err: any) =>
            //                 console.log('in', err?.code, err?.message),
            //             );
            //     } catch (error: any) {
            //         console.log('out', error?.code, error?.message);
            //     }
            // } else {
            //     try {
            //         await NativeModules.MyAppHideModule.enableApp(app?.bundleID)
            //             .then((res: any) => console.log(res))
            //             .catch((err: any) =>
            //                 console.log('in', err?.code, err?.message),
            //             );
            //     } catch (error: any) {
            //         console.log('out', error?.code, error?.message);
            //     }
            // }
        },
    });
    return (
        <TouchableOpacity
            onPress={enable_disable_app}
            activeOpacity={0.5}
            style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
            }}>
            <Image
                style={{
                    marginLeft: 10,
                    width: 50,
                    height: 50,
                }}
                source={{
                    uri: `data:image/png;base64,${app?.icon}`,
                    width: 50,
                    height: 50,
                }}
            />
            <BasicText
                inputText={app?.name?.replace('.app', '') as string}
                marginLeft={5}
                textWeight={600}
                textSize={16}
            />
        </TouchableOpacity>
    );
};

export default AppInfo;

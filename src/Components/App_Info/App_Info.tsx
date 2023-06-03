import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';
import BasicText from '../Basic_Text/Basic_Text';

interface AppInfoProps {
    app: INTF_AppInfo;
}
const AppInfo: FunctionComponent<AppInfoProps> = ({ app }) => {
    return (
        <TouchableOpacity
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

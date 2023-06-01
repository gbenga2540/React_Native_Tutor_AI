import React, { FunctionComponent } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

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
            <Text
                style={{
                    color: Colors.Dark,
                    marginLeft: 5,
                    fontFamily: fonts.Urbanist_600,
                    fontSize: 16,
                }}>
                {app?.name?.replace('.app', '')}
            </Text>
        </TouchableOpacity>
    );
};

export default AppInfo;

import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { INTF_ProfileMenu } from '../../Interface/Profile_Menu/Profile_Menu';
import { fonts } from '../../Configs/Fonts/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import TextDivider from '../Text_Divider/Text_Divider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface MenuMakerProps {
    menu: INTF_ProfileMenu[];
    backgroundColor?: string;
    textColor?: string;
    lineColor?: string;
    arrowColor?: string;
    marginTop?: string | number;
    marginBottom?: string | number;
    marginHorizontal?: string | number;
    borderRadius?: number;
}
const MenuMaker: FunctionComponent<MenuMakerProps> = ({
    menu,
    backgroundColor,
    textColor,
    lineColor,
    arrowColor,
    marginTop,
    marginBottom,
    marginHorizontal,
    borderRadius,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View
            style={{
                backgroundColor: backgroundColor || Colors.White,
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
                marginHorizontal: marginHorizontal || 22,
                borderRadius: borderRadius || 10,
            }}>
            {menu?.length === 1 && (
                <TouchableOpacity
                    key={menu[0].id}
                    onPress={no_double_clicks({
                        execFunc: () => {
                            navigation.push(
                                menu[0].stack as never,
                                {
                                    screen: menu[0].screen,
                                    ...menu[0].params,
                                } as never,
                            );
                        },
                    })}
                    activeOpacity={0.55}
                    style={{
                        height: 56,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.Urbanist_600,
                            marginLeft: 17,
                            fontSize: 15,
                            color: textColor || Colors.Dark,
                            marginRight: 'auto',
                        }}>
                        {menu[0].name}
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={24}
                        color={arrowColor || Colors.Dark}
                        style={{
                            marginRight: 13,
                        }}
                    />
                </TouchableOpacity>
            )}
            {menu?.length > 1 &&
                menu?.map((item, index) => (
                    <View key={item?.id}>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        item.stack as never,
                                        {
                                            screen: item.screen,
                                            ...item.params,
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                height: 56,
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_600,
                                    marginLeft: 17,
                                    fontSize: 15,
                                    color: textColor || Colors.Dark,
                                    marginRight: 'auto',
                                }}>
                                {item.name}
                            </Text>
                            <Feather
                                name="chevron-right"
                                size={24}
                                color={arrowColor || Colors.Dark}
                                style={{
                                    marginRight: 13,
                                }}
                            />
                        </TouchableOpacity>
                        {index !== menu?.length - 1 && (
                            <TextDivider
                                singleLine
                                marginHorizontal={15}
                                lineColor={
                                    lineColor || 'rgba(255, 255, 255, 0.8)'
                                }
                            />
                        )}
                    </View>
                ))}
        </View>
    );
};

export default MenuMaker;

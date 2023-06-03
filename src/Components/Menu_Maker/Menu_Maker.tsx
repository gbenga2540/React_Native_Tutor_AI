import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { INTF_ProfileMenu } from '../../Interface/Profile_Menu/Profile_Menu';
import Feather from 'react-native-vector-icons/Feather';
import TextDivider from '../Text_Divider/Text_Divider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../Basic_Text/Basic_Text';

interface MenuMakerProps {
    menu: INTF_ProfileMenu[];
    backgroundColor?: string;
    textColor?: string;
    lineColor?: string;
    arrowColor?: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
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
                            if (menu[0]?.screen) {
                                navigation.push(
                                    menu[0].stack as never,
                                    {
                                        screen: menu[0].screen,
                                        params: {
                                            ...menu[0].params,
                                        },
                                    } as never,
                                );
                            } else {
                                navigation.push(
                                    menu[0].stack as never,
                                    {
                                        ...menu[0].params,
                                    } as never,
                                );
                            }
                        },
                    })}
                    activeOpacity={0.55}
                    style={{
                        height: 56,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <BasicText
                        inputText={menu[0].name}
                        textWeight={600}
                        marginLeft={17}
                        textSize={15}
                        textColor={textColor || Colors.Dark}
                        marginRight={'auto'}
                    />
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
                                    if (item?.screen) {
                                        navigation.push(
                                            item.stack as never,
                                            {
                                                screen: item.screen,
                                                params: {
                                                    ...item.params,
                                                },
                                            } as never,
                                        );
                                    } else {
                                        navigation.push(
                                            item.stack as never,
                                            {
                                                ...item.params,
                                            } as never,
                                        );
                                    }
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                height: 56,
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                            <BasicText
                                inputText={item.name}
                                marginLeft={17}
                                marginRight={'auto'}
                                textColor={textColor || Colors.Dark}
                                textWeight={600}
                                textSize={15}
                            />
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

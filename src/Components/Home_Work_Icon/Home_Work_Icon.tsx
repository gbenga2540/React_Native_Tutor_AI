import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CheckIcon from '../../Images/SVGs/Check_Icon.svg';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { INTF_AssignedClass } from '../../Interface/Assigned_Class/Assigned_Class';

interface HomeWorkIconProps {
    homework_index: number;
    is_completed: boolean;
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    show_icon?: boolean;
    userLevel: INTF_AssignedClass;
}
const HomeWorkIcon: FunctionComponent<HomeWorkIconProps> = ({
    homework_index,
    is_completed,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    show_icon,
    userLevel,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const nav_to_home_q = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'HomeWorkQPage',
                    params: {
                        lesson_id: homework_index,
                        user_level: userLevel,
                        retake: is_completed || false,
                    },
                } as never,
            );
        },
    });

    if (show_icon) {
        return (
            <TouchableOpacity
                onPress={nav_to_home_q}
                activeOpacity={0.55}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 5,
                    borderColor: is_completed
                        ? Colors.Primary
                        : Colors.LightGrey,
                    marginRight: marginRight || 0,
                    marginLeft: marginLeft || 0,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                }}>
                {is_completed && (
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            backgroundColor: Colors.Primary,
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            top: 1,
                            right: -8,
                        }}>
                        <CheckIcon color={Colors.White} />
                    </View>
                )}
                <Image
                    source={require('../../Images/Logos/Tutor_AI_Logo.png')}
                    style={{ width: 80, height: 80, borderRadius: 80 }}
                />
            </TouchableOpacity>
        );
    } else {
        return null;
    }
};

export default HomeWorkIcon;

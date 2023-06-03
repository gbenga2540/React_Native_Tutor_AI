import React, { FunctionComponent } from 'react';
import {
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CheckIcon from '../../Images/SVGs/Check_Icon.svg';

interface HomeWorkIconProps {
    image_icon: ImageSourcePropType;
    is_completed: boolean;
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
}
const HomeWorkIcon: FunctionComponent<HomeWorkIconProps> = ({
    image_icon,
    is_completed,
    marginLeft,
    marginRight,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.55}
            style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 5,
                borderColor: is_completed ? Colors.Primary : Colors.LightGrey,
                marginRight: marginRight || 0,
                marginLeft: marginLeft || 0,
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
            <Image source={image_icon} style={{ width: 80, height: 80 }} />
        </TouchableOpacity>
    );
};

export default HomeWorkIcon;

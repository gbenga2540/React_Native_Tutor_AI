import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { DebouncedFuncLeading } from 'lodash';

interface IconTextProps {
    buttonName: string;
    buttonColor: string;
    iconName: string;
    execFunc?: DebouncedFuncLeading<() => void>;
}
const IconText: FunctionComponent<IconTextProps> = ({
    buttonName,
    buttonColor,
    iconName,
    execFunc,
}) => {
    return (
        <TouchableOpacity style={styles.c_btn} onPress={execFunc}>
            <Feather
                name={iconName}
                size={21}
                color={buttonColor || Colors().Black}
            />
            <Text
                style={{
                    color: buttonColor || Colors().Black,
                    fontSize: 16,
                    fontFamily: fonts.OpenSans_500,
                    marginLeft: 3,
                }}>
                {buttonName}
            </Text>
        </TouchableOpacity>
    );
};

export default IconText;

const styles = StyleSheet.create({
    c_btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

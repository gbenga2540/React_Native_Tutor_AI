import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../Basic_Text/Basic_Text';

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
    const exec_func = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            if (execFunc !== undefined) {
                execFunc();
            }
        },
    });

    return (
        <TouchableOpacity style={styles.c_btn} onPress={exec_func}>
            <Feather
                name={iconName}
                size={21}
                color={buttonColor || Colors.Black}
            />
            <BasicText
                inputText={buttonName}
                textFamily={fonts.OpenSans_500}
                marginLeft={3}
                textSize={16}
                textColor={buttonColor || Colors.Black}
            />
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

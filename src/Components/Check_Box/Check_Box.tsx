import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface CheckBoxProps {
    size?: number;
    padding?: number;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
}
const CheckBox: FunctionComponent<CheckBoxProps> = ({
    size,
    padding,
    active,
    setActive,
    marginLeft,
    marginRight,
}) => {
    const checkbox_func = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            setActive(!active);
        },
    });

    return (
        <TouchableOpacity
            style={[
                styles.bb_main,
                {
                    width: size || 30,
                    height: size || 30,
                    padding: padding || 2.3,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                },
            ]}
            activeOpacity={0.65}
            onPress={checkbox_func}>
            {active && (
                <View
                    style={{
                        backgroundColor: Colors.Primary,
                        width: '100%',
                        height: '100%',
                        borderRadius: 2,
                    }}>
                    {''}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    bb_main: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.Primary,
    },
});

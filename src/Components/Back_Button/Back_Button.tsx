import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Feather from 'react-native-vector-icons/Feather';

interface BackButtonProps {
    execFunc?: () => void;
    backgroundColor?: string;
    borderColor?: string;
    arrowColor?: string;
}
const BackButton: FunctionComponent<BackButtonProps> = ({
    execFunc,
    backgroundColor,
    borderColor,
    arrowColor,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const go_back = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            if (execFunc === undefined) {
                navigation.canGoBack() && navigation.goBack();
            } else {
                execFunc();
            }
        },
    });

    if (navigation.canGoBack()) {
        return (
            <TouchableOpacity
                style={[
                    styles.bb_main,
                    {
                        backgroundColor: backgroundColor || Colors.Background,
                        borderColor: borderColor || Colors.Border,
                    },
                ]}
                activeOpacity={0.65}
                onPress={go_back}>
                <Feather
                    name="chevron-left"
                    size={25}
                    color={arrowColor || Colors.Dark}
                />
            </TouchableOpacity>
        );
    } else {
        return null;
    }
};

export default BackButton;

const styles = StyleSheet.create({
    bb_main: {
        width: 41,
        height: 41,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
    },
});

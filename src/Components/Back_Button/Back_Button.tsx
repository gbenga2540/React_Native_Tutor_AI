import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Feather from 'react-native-vector-icons/Feather';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';

interface BackButtonProps {
    execFunc?: () => void;
    backgroundColor?: string;
    borderColor?: string;
    arrowColor?: string;
    show_back_button?: boolean;
}
const BackButton: FunctionComponent<BackButtonProps> = ({
    execFunc,
    backgroundColor,
    borderColor,
    arrowColor,
    show_back_button,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const go_back = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            if (execFunc === undefined) {
                TextToSpeechStore.clear_speech();
                navigation.canGoBack() && navigation.goBack();
            } else {
                TextToSpeechStore.clear_speech();
                execFunc();
            }
        },
    });

    if (navigation.canGoBack() || show_back_button) {
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

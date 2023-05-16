import React, { FunctionComponent } from 'react';
import { Image, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface BackButtonProps {
    execFunc?: () => void;
}
const BackButton: FunctionComponent<BackButtonProps> = ({ execFunc }) => {
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
                style={styles.bb_main}
                activeOpacity={0.65}
                onPress={go_back}>
                <Image
                    source={require('../../Images/Icons/Back_Arrow.png')}
                    style={{
                        width: 19,
                        height: 19,
                    }}
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
        backgroundColor: Colors.Background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.Border,
    },
});

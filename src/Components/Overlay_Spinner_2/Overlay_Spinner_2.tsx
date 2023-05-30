import React, { FunctionComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Spinner, { SpinnerType } from 'react-native-spinkit';
import { spinkit_types } from '../../Data/Spinkit_Types/SpinKit_Types';
import Colors from '../../Configs/Colors/Colors';

interface ShowSpinnerProps {
    showSpinner: boolean;
}
const OverlaySpinner2: FunctionComponent<ShowSpinnerProps> = ({
    showSpinner,
}) => {
    if (showSpinner) {
        return (
            <View style={styles.overlay_spinner_main}>
                <Spinner
                    isVisible={true}
                    size={80}
                    type={
                        spinkit_types[
                            Platform.OS === 'ios' ? 12 : 6
                        ] as SpinnerType
                    }
                    color={Colors.Primary}
                />
            </View>
        );
    } else {
        return null;
    }
};

export default OverlaySpinner2;

const styles = StyleSheet.create({
    overlay_spinner_main: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

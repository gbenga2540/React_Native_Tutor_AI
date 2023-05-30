import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Spinner, { SpinnerType } from 'react-native-spinkit';
import { spinkit_types } from '../../Data/Spinkit_Types/SpinKit_Types';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

interface ShowSpinnerProps {
    showSpinner: boolean;
    setShowSpinner: Dispatch<SetStateAction<boolean>>;
}
const OverlaySpinner: FunctionComponent<ShowSpinnerProps> = ({
    showSpinner,
    setShowSpinner,
}) => {
    if (showSpinner) {
        return (
            <View style={styles.overlay_spinner_main}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={Colors.BackgroundDim}
                />
                <TouchableOpacity
                    onPress={() => setShowSpinner(false)}
                    style={{
                        position: 'absolute',
                        left: 23,
                        top: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Feather
                        name="chevron-left"
                        size={35}
                        color={Colors.White}
                    />
                </TouchableOpacity>
                <Spinner
                    isVisible={true}
                    size={80}
                    type={
                        spinkit_types[
                            Platform.OS === 'ios' ? 12 : 1
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

export default OverlaySpinner;

const styles = StyleSheet.create({
    overlay_spinner_main: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});

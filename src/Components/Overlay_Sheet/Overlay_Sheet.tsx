import React, { FunctionComponent } from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import Colors from '../../Configs/Colors/Colors';

interface ShowOverlayProps {
    showOverlay: boolean;
}
const OverlaySheet: FunctionComponent<ShowOverlayProps> = ({ showOverlay }) => {
    const hide_overlay = no_double_clicks({
        execFunc: () => {
            BottomSheetStore.close_bottom_sheet();
        },
    });

    if (showOverlay) {
        return (
            <Text onPress={hide_overlay} style={styles.overlay_sheet_main}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={
                        showOverlay || false
                            ? Colors.BackgroundDim
                            : Colors.Background
                    }
                />
            </Text>
        );
    } else {
        return null;
    }
};

export default OverlaySheet;

const styles = StyleSheet.create({
    overlay_sheet_main: {
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

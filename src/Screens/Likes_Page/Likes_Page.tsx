import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../Components/Back_Button/Back_Button';

const LikesPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const route = useRoute<RouteProp<any>>();
    console.log(route.params);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    return (
        <View style={styles.bdp_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: navigation?.canGoBack()
                        ? Platform?.OS === 'ios'
                            ? 56
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 5,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <Text
                style={{
                    color: Colors().Black,
                    textAlign: 'center',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                Likes_Page
            </Text>
        </View>
    );
};

export default LikesPage;

const styles = StyleSheet.create({
    bdp_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
});

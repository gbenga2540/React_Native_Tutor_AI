import React, { FunctionComponent } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import PlayIcon from '../../Images/SVGs/Play_Icon.svg';
import { fonts } from '../../Configs/Fonts/Fonts';

const HomeWorkPage: FunctionComponent = () => {
    return (
        <View style={styles.hw_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.l_header_cont}>
                <Text style={styles.l_header}>Homework</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.55}
                style={{
                    alignSelf: 'center',
                    width: 250,
                    height: 100,
                    backgroundColor: Colors.LightPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    borderRadius: 15,
                }}>
                <PlayIcon width={25} height={25} color={Colors.Primary} />
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Primary,
                        fontSize: 20,
                        marginTop: 3,
                    }}>
                    Start
                </Text>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        marginBottom: 20,
                    }}>
                    {''}
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeWorkPage;

const styles = StyleSheet.create({
    hw_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    l_header_cont: {
        height: Platform.OS === 'ios' ? 120 : 80,
        paddingLeft: 22,
        backgroundColor: Colors.Background,
        shadowColor: 'rgba(0 ,0 ,0 , 0.35)',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
    },
    l_header: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 25,
        marginTop: 'auto',
        marginBottom: 18,
        color: Colors.Dark,
    },
});

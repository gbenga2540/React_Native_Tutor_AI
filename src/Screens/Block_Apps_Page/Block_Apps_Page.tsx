import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import HeaderTab from '../../Components/Header_Tab/Header_Tab';

const BlockAppsPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const save_blocked_apps = no_double_clicks({
        execFunc: () => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeStack' }],
                }),
            );
        },
    });

    return (
        <View style={styles.bap_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop: 65,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <Text
                    style={{
                        marginLeft: 30,
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Dark,
                        fontSize: 20,
                    }}>
                    Parental Control
                </Text>
            </View>
            <ScrollView style={{ flex: 1, marginHorizontal: 25 }}>
                <HeaderTab
                    marginTop={20}
                    header_1="Apps"
                    header_2="Blocked"
                    show_numbers
                    number_1={50}
                    number_2={20}
                    marginBetween={4}
                />
            </ScrollView>
            <BasicButton
                buttonText="Save"
                marginHorizontal={22}
                marginTop={'auto'}
                marginBottom={50}
                execFunc={save_blocked_apps}
            />
        </View>
    );
};

export default BlockAppsPage;

const styles = StyleSheet.create({
    bap_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

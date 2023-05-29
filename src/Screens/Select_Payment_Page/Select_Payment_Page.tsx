import React, { FunctionComponent, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { payment_methods_data } from '../../Data/Payment_Methods/Payment_Methods';
import PaymentMethod from '../../Components/Payment_Mathod/Payment_Mathod';

const SelectPaymentPage: FunctionComponent = () => {
        const navigation = useNavigation<NativeStackNavigationProp<any>>();

        const [subPM, setSubPM] = useState<number>(1);

        const nav_to_add_payment_page = no_double_clicks({
                execFunc: () => {
                        switch (subPM) {
                                case 1:
                                        navigation.push(
                                                'HomeStack' as never,
                                                {
                                                        screen: 'AddPaymentPage',
                                                } as never,
                                        );
                                        break;
                                case 2:
                                        navigation.push(
                                                'HomeStack' as never,
                                                {
                                                        screen: 'AddPaymentPage',
                                                } as never,
                                        );
                                        break;
                                case 3:
                                        navigation.push(
                                                'HomeStack' as never,
                                                {
                                                        screen: 'AddPaymentPage',
                                                } as never,
                                        );
                                        break;
                                case 4:
                                        navigation.push(
                                                'HomeStack' as never,
                                                {
                                                        screen: 'AddPaymentPage',
                                                } as never,
                                        );
                                        break;
                                default:
                                        navigation.push(
                                                'HomeStack' as never,
                                                {
                                                        screen: 'AddPaymentPage',
                                                } as never,
                                        );
                                        break;
                        }
                },
        });

        return (
                <View style={styles.sub_main}>
                        <CustomStatusBar backgroundColor={Colors.Background} />
                        <View
                                style={{
                                        marginTop: 65,
                                        marginHorizontal: 22,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                }}>
                                <BackButton backgroundColor={Colors.Amber} borderColor={Colors.DarkGrey} />
                                <Text
                                        style={{
                                                marginLeft: 30,
                                                fontFamily: fonts.Urbanist_700,
                                                color: Colors.Dark,
                                                fontSize: 20,
                                        }}>
                                        Payment Method
                                </Text>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                                <View
                                        style={{
                                                backgroundColor: Colors.White,
                                                marginHorizontal: 22,
                                                marginTop: 40,
                                                borderRadius: 15,
                                                padding: 20,
                                        }}>
                                        <Text
                                                style={{
                                                        color: Colors.Dark,
                                                        fontSize: 20,
                                                        fontFamily: fonts.Urbanist_600,
                                                        textAlign: 'center',
                                                }}>
                                                Select Payment Method
                                        </Text>
                                        <TextDivider singleLine marginTop={15} marginBottom={32} />
                                        {payment_methods_data?.map((item, index) => (
                                                <PaymentMethod payment_method={item} index={item?.id} key={index} activePM={subPM} setActivePM={setSubPM} />
                                        ))}
                                </View>
                        </ScrollView>
                        <BasicButton buttonText="Continue" marginHorizontal={22} backgroundColor={Colors.Black} textColor={Colors.White} marginTop={'auto'} marginBottom={Platform.OS === 'ios' ? 50 : 20} execFunc={nav_to_add_payment_page} />
                </View>
        );
};

export default SelectPaymentPage;

const styles = StyleSheet.create({
        sub_main: {
                flex: 1,
                backgroundColor: Colors.Amber,
        },
});

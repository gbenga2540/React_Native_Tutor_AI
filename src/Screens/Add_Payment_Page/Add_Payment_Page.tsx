import React, { FunctionComponent, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import CheckBox from '../../Components/Check_Box/Check_Box';

const AddPaymentPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [cardName, setCardName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardNumberView, setCardNumberView] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [expiryDateView, setExpiryDateView] = useState<string>('');
    const [cvv, setCVV] = useState<string>('');
    const [cardPin, setCardPin] = useState<string>('');
    const [saveCard, setSaveCard] = useState<boolean>(false);

    useEffect(() => {
        const fullCardNumber = cardNumber.replace(/\D/g, '');
        const g_CardNumber = fullCardNumber.match(/.{1,4}/g);
        const f_CardNumber = g_CardNumber ? g_CardNumber.join(' ') : '';
        setCardNumberView(f_CardNumber);
    }, [cardNumber]);

    useEffect(() => {
        const fullED = expiryDate.replace(/\D/g, '');
        const month = fullED.slice(0, 1);
        const year = fullED.slice(1, 4);
        if (expiryDate?.length > 0) {
            setExpiryDateView(`${month}/${year}`);
        } else {
            setCardNumberView('');
        }
    }, [expiryDate]);

    const nav_to_payment_successful_page = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'CongratulationsPage',
                    params: {
                        header_txt: 'Payment Successful!',
                        message_txt:
                            'You have successfully subscribed for Tutor AI. We wish you Good Luck and Thanks!',
                        nextPage: 3,
                    },
                } as never,
            );
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
                <BackButton />
                <Text
                    style={{
                        marginLeft: 30,
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Dark,
                        fontSize: 20,
                    }}>
                    Add Payment Method
                </Text>
            </View>
            <ScrollView style={{ flex: 1, marginHorizontal: 25 }}>
                <Text
                    style={{
                        color: Colors.Primary,
                        fontSize: 15,
                        fontFamily: fonts.Urbanist_500,
                        marginTop: 40,
                    }}>
                    Enter your Card Details
                </Text>
                <Text style={styles.payment_h_txt}>Card Name</Text>
                <BasicTextEntry
                    inputMode="text"
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={cardName}
                    setInputValue={setCardName}
                    placeHolderText="John Doe"
                />
                <Text style={styles.payment_h_txt}>Card Number</Text>
                <BasicTextEntry
                    inputMode="numeric"
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={cardNumberView}
                    setInputValue={setCardNumber}
                    maxLength={19}
                    placeHolderText="5399 0000 2222 3333"
                />
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={{
                            flex: 1,
                            marginRight: 10,
                        }}>
                        <Text style={styles.payment_h_txt}>Expiry Date</Text>
                        <BasicTextEntry
                            inputMode="numeric"
                            marginHorizontal={0.01}
                            marginTop={10}
                            inputValue={expiryDateView}
                            setInputValue={setExpiryDate}
                            placeHolderText="4/24"
                            maxLength={4}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 10,
                        }}>
                        <Text style={styles.payment_h_txt}>CVV</Text>
                        <BasicTextEntry
                            inputMode="numeric"
                            marginHorizontal={0.01}
                            marginTop={10}
                            inputValue={cvv}
                            setInputValue={setCVV}
                            placeHolderText="123"
                            maxLength={3}
                        />
                    </View>
                </View>
                <Text style={styles.payment_h_txt}>Card PIN</Text>
                <SecureTextEntry
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={cardPin}
                    setInputValue={setCardPin}
                    placeHolderText="2525"
                    inputMode="numeric"
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 25,
                        justifyContent: 'flex-end',
                    }}>
                    <Text style={[styles.payment_h_txt, { marginTop: 0 }]}>
                        Save Card
                    </Text>
                    <CheckBox
                        active={saveCard}
                        setActive={setSaveCard}
                        marginLeft={5}
                        size={25}
                    />
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Confirm"
                marginHorizontal={22}
                marginTop={'auto'}
                marginBottom={Platform.OS === 'ios' ? 50 : 20}
                execFunc={nav_to_payment_successful_page}
            />
        </View>
    );
};

export default AddPaymentPage;

const styles = StyleSheet.create({
    sub_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    payment_h_txt: {
        color: Colors.Dark,
        fontSize: 15,
        fontFamily: fonts.Urbanist_500,
        marginTop: 25,
    },
});

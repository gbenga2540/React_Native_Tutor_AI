import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import CheckBox from '../../Components/Check_Box/Check_Box';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

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
        <View style={styles.add_p_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 45,
                                  if_false: 65,
                              })
                            : 25,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Add Payment Method"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
            </View>
            <ScrollView
                style={{ flex: 1, paddingHorizontal: 21, marginHorizontal: 3 }}>
                <BasicText
                    inputText="Enter your Card Details"
                    textSize={15}
                    textColor={Colors.Primary}
                    textWeight={500}
                    marginTop={40}
                />
                <BasicText
                    inputText="Card Name"
                    textSize={15}
                    marginTop={25}
                    textWeight={500}
                />
                <BasicTextEntry
                    inputMode="text"
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={cardName}
                    setInputValue={setCardName}
                    placeHolderText="John Doe"
                />
                <BasicText
                    inputText="Card Number"
                    textSize={15}
                    marginTop={25}
                    textWeight={500}
                />
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
                        <BasicText
                            inputText="Expiry Date"
                            textSize={15}
                            marginTop={25}
                            textWeight={500}
                        />
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
                        <BasicText
                            inputText="CVV"
                            textSize={15}
                            marginTop={25}
                            textWeight={500}
                        />
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
                <BasicText
                    inputText="Card PIN"
                    textSize={15}
                    marginTop={25}
                    textWeight={500}
                />
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
                    <BasicText
                        inputText="Save Card"
                        textSize={15}
                        marginTop={0.1}
                        textWeight={500}
                    />
                    <CheckBox
                        active={saveCard}
                        setActive={setSaveCard}
                        marginLeft={5}
                        size={25}
                    />
                </View>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText="Confirm"
                    marginHorizontal={22}
                    marginTop={'auto'}
                    marginBottom={
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 40,
                              })
                            : 20
                    }
                    execFunc={nav_to_payment_successful_page}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddPaymentPage;

const styles = StyleSheet.create({
    add_p_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

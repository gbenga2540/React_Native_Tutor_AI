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
import { useMutation } from 'react-query';
import { card_payment } from '../../Configs/Queries/Payment/Payment';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { card_number_checker } from '../../Utils/Card_Number_Checker/Card_Number_Checker';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_CREDIT_CARD_INFO, SECURE_STORAGE_NAME } from '@env';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';

const AddPaymentPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [cardName, setCardName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardNumberView, setCardNumberView] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [expiryDateView, setExpiryDateView] = useState<string>('');
    const [cvv, setCVV] = useState<string>('');
    const [cardPin, setCardPin] = useState<string>('');
    const [saveCard, setSaveCard] = useState<boolean>(false);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: card_payment_mutate } = useMutation(card_payment, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            setShowSpinner(false);
            setDisableButton(false);
            if (data?.error) {
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'An error occured while trying to make Payment via Card!',
                    svr_error_mssg: data?.data,
                });
            } else {
                // const proceed = () => {
                //     UserInfoStore.set_user_info({
                //         user_info: { ...data?.data },
                //     });
                // };
                // try {
                //     await SInfo.setItem(
                //         SECURE_STORAGE_USER_INFO,
                //         JSON.stringify({
                //             user_info: { ...data?.data },
                //         }),
                //         {
                //             sharedPreferencesName: SECURE_STORAGE_NAME,
                //             keychainService: SECURE_STORAGE_NAME,
                //         },
                //     )
                //         .catch(error => {
                //             error && proceed();
                //         })
                //         .then(() => {
                //             proceed();
                //         });
                // } catch (err) {
                //     proceed();
                // }
            }
        },
    });

    const proceed_to_pay = no_double_clicks({
        execFunc: async () => {
            // navigation.push(
            //     'AuthStack' as never,
            //     {
            //         screen: 'CongratulationsPage',
            //         params: {
            //             header_txt: 'Payment Successful!',
            //             message_txt:
            //                 'You have successfully subscribed for Tutor AI. We wish you Good Luck and Thanks!',
            //             nextPage: 3,
            //         },
            //     } as never,
            // );
            // card_payment_mutate({
            //     userAuth: UserInfoStore?.user_info?.accessToken as string,
            //     userPlan: 'Beginner',
            //     paymentToken: '',
            // });
            if (cardName && cardNumber && expiryDate && cvv && cardPin) {
                if (card_number_checker({ card_number: cardNumber })) {
                    const proceed = () => {
                        console.log('paid');
                    };

                    if (saveCard) {
                        try {
                            await SInfo.setItem(
                                SECURE_STORAGE_CREDIT_CARD_INFO,
                                JSON.stringify({
                                    card_info: {
                                        cardName: cardName,
                                        cardNumber: cardNumber,
                                        expiryDate: expiryDate,
                                        cvv: cvv,
                                    },
                                }),
                                {
                                    sharedPreferencesName: SECURE_STORAGE_NAME,
                                    keychainService: SECURE_STORAGE_NAME,
                                },
                            )
                                .catch(error => {
                                    error && proceed();
                                })
                                .then(() => {
                                    proceed();
                                });
                        } catch (err) {
                            proceed();
                        }
                    } else {
                        proceed();
                    }
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Invalid Card Number!',
                    });
                }
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Some required fields are missing!',
                });
            }
        },
    });

    useEffect(() => {
        const fullCardNumber = cardNumber.replace(/\D/g, '');
        const g_CardNumber = fullCardNumber.match(/.{1,4}/g);
        const f_CardNumber = g_CardNumber ? g_CardNumber.join(' ') : '';
        setCardNumberView(f_CardNumber);
    }, [cardNumber]);

    console.log(expiryDate);

    useEffect(() => {
        const fullED = expiryDate.replace(/\D/g, '');
        const month = fullED.slice(0, 1);
        const year = fullED.slice(1, 4);
        if (expiryDate?.length > 0) {
            setExpiryDateView(`${month}/${year}`);
        } else {
            setExpiryDateView('');
        }
    }, [expiryDate]);

    return (
        <View style={styles.add_p_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
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
                            placeHolderText="04/24"
                            maxLength={5}
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
                    disabled={disableButton}
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
                    execFunc={() => proceed_to_pay({})}
                />
            </KeyboardAvoidingView>
        </View>
    );
});

export default AddPaymentPage;

const styles = StyleSheet.create({
    add_p_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

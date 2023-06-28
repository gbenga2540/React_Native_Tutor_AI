import React, { FunctionComponent, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View, Modal } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import {
    CommonActions,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { payment_methods_data } from '../../Data/Payment_Methods/Payment_Methods';
import PaymentMethod from '../../Components/Payment_Mathod/Payment_Mathod';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { INTF_PaymentPlan } from '../../Interface/Subscription/Subscription';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useMutation } from 'react-query';
import {
    paypal_intent,
    stripe_intent,
} from '../../Configs/Queries/Payment/Payment';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { useStripe } from '@stripe/stripe-react-native';
import { subscription_data } from '../../Data/Subscription/Subscription';
import { WebView, WebViewNavigation } from 'react-native-webview';

const SelectPaymentPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [paypalLink, setPaypalLink] = useState<string>('');

    const [subPM, setSubPM] = useState<number>(1);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: stripe_intent_mutate } = useMutation(stripe_intent, {
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
                    error_mssg: 'Something went wrong!',
                    svr_error_mssg: data?.data,
                });
            } else {
                const client_secret: string = data?.data;

                const initResponse = await initPaymentSheet({
                    merchantDisplayName: 'Tutor AI, Inc.',
                    paymentIntentClientSecret: client_secret,
                    defaultBillingDetails: {
                        name: 'Tutor AI',
                    },
                });

                if (initResponse.error) {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Something went wrong!',
                        svr_error_mssg: initResponse.error.message,
                    });
                } else {
                    const paymentResponse = await presentPaymentSheet();

                    if (paymentResponse.error) {
                        if (paymentResponse.error.code !== 'Canceled') {
                            error_handler({
                                navigation: navigation,
                                error_mssg: 'Something went wrong!',
                                svr_error_mssg: paymentResponse.error.message,
                            });
                        }
                    } else {
                        handle_final_payments();
                    }
                }
            }
        },
    });

    const handle_final_payments = () => {
        navigation.push(
            'AuthStack' as never,
            {
                screen: 'CongratulationsPage',
                params: {
                    header_txt: 'Payment Successful!',
                    message_txt: `You have successfully paid for ${
                        subscription_data.filter(
                            item => item?.plan === route.params?.paymentPlan,
                        )?.[0]?.no_of_lessons
                    } Lessons!`,
                    nextPage: 5,
                },
            } as never,
        );
    };

    const { mutate: paypal_intent_mutate } = useMutation(paypal_intent, {
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
                    error_mssg: 'Something went wrong!',
                    svr_error_mssg: data?.data,
                });
            } else {
                setPaypalLink(data?.data);
                setShowModal(true);
            }
        },
    });

    const pay_with_paypal = () => {
        const paymentPlan: INTF_PaymentPlan = route.params?.paymentPlan;
        if (paymentPlan) {
            paypal_intent_mutate({
                userAuth: UserInfoStore?.user_info?.accessToken as string,
                userPlan: paymentPlan,
            });
        } else {
            error_handler({
                navigation: navigation,
                error_mssg: 'No Payment Plan Selected!',
            });
        }
    };

    const pay_with_stripe = () => {
        const paymentPlan: INTF_PaymentPlan = route.params?.paymentPlan;
        if (paymentPlan) {
            stripe_intent_mutate({
                userAuth: UserInfoStore?.user_info?.accessToken as string,
                userPlan: paymentPlan,
            });
        } else {
            error_handler({
                navigation: navigation,
                error_mssg: 'No Payment Plan Selected!',
            });
        }
    };

    const proceed_to_pay = no_double_clicks({
        execFunc: () => {
            switch (subPM) {
                case 1:
                    pay_with_paypal();
                    break;
                case 2:
                    pay_with_stripe();
                    break;
                default:
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'HomeStack',
                                },
                            ],
                        }),
                    );
                    break;
            }
        },
    });

    const handleModalResponse = ({ data }: { data: WebViewNavigation }) => {
        if (data.url.includes('/payment/paypal-cancel')) {
            setShowModal(false);
            error_handler({
                navigation: navigation,
                error_mssg: 'Payment was Cancelled!',
            });
        } else if (data.url.includes('/payment/paypal-success')) {
            setShowModal(false);
            handle_final_payments();
        } else {
            return;
        }
    };

    return (
        <View style={styles.sub_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}>
                <View
                    style={{
                        marginTop:
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_true: 45,
                                      if_false: 65,
                                  })
                                : 25,
                        flex: 1,
                        marginBottom:
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_false: 35,
                                      if_true: 10,
                                  })
                                : 10,
                    }}>
                    <CustomStatusBar backgroundColor={Colors.Background} />
                    <WebView
                        source={{ uri: paypalLink }}
                        onNavigationStateChange={(data: WebViewNavigation) =>
                            handleModalResponse({ data })
                        }
                    />
                </View>
            </Modal>
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
                    inputText="Payment Method"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: Colors.Border,
                        marginHorizontal: 22,
                        marginTop: screen_height_less_than({
                            if_true: 20,
                            if_false: 40,
                        }),
                        borderRadius: 15,
                        padding: 20,
                        paddingBottom: screen_height_less_than({
                            if_true: 5,
                            if_false: 20,
                        }),
                    }}>
                    <BasicText
                        inputText="Select Payment Method"
                        textSize={20}
                        textWeight={600}
                        textAlign="center"
                    />
                    <TextDivider
                        singleLine
                        marginTop={screen_height_less_than({
                            if_true: 9,
                            if_false: 15,
                        })}
                        marginBottom={screen_height_less_than({
                            if_true: 20,
                            if_false: 32,
                        })}
                    />
                    {payment_methods_data?.map((item, index) => (
                        <PaymentMethod
                            payment_method={item}
                            index={item?.id}
                            key={index}
                            activePM={subPM}
                            setActivePM={setSubPM}
                        />
                    ))}
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Continue"
                disabled={disableButton}
                marginHorizontal={22}
                marginTop={2}
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
        </View>
    );
};

export default SelectPaymentPage;

const styles = StyleSheet.create({
    sub_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

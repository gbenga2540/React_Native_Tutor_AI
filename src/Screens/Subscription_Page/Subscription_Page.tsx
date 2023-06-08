import React, { FunctionComponent, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import SubscriptionPlan from '../../Components/Subscription_Plan/Subscription_Plan';
import { subscription_data } from '../../Data/Subscription/Subscription';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const SubscriptionPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [subPlan, setSubPlan] = useState<number>(1);

    const nav_to_select_payment_page = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                { screen: 'SelectPaymentPage' } as never,
            );
        },
    });

    return (
        <View style={styles.sub_main}>
            <CustomStatusBar backgroundColor={Colors.Amber} />
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
                <BackButton
                    backgroundColor={Colors.Amber}
                    borderColor={Colors.DarkGrey}
                />
                <BasicText
                    inputText="Subscription"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
                <Image
                    source={require('../../Images/Icons/Subscription_Crown.png')}
                    style={{
                        marginLeft: 10,
                        width: 35,
                        height: 35,
                    }}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: Colors.White,
                        marginHorizontal: 22,
                        marginTop: 40,
                        borderRadius: 15,
                        padding: 20,
                        paddingBottom: screen_height_less_than({
                            if_true: 5,
                            if_false: 20,
                        }),
                    }}>
                    <BasicText
                        inputText="Choose a Subscription Plan"
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
                    {subscription_data?.map((item, index) => (
                        <SubscriptionPlan
                            subscription={item}
                            index={item?.id}
                            key={index}
                            activeSubPlan={subPlan}
                            setActiveSubPlan={setSubPlan}
                        />
                    ))}
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Continue"
                marginHorizontal={22}
                backgroundColor={Colors.Black}
                textColor={Colors.White}
                marginTop={2}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_true: 10,
                              if_false: 40,
                          })
                        : 20
                }
                execFunc={nav_to_select_payment_page}
            />
        </View>
    );
};

export default SubscriptionPage;

const styles = StyleSheet.create({
    sub_main: {
        flex: 1,
        backgroundColor: Colors.Amber,
    },
});

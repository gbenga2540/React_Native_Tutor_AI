import React, { FunctionComponent, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import ParentalControlIcon from '../../Images/SVGs/Parental_Control_Icon.svg';
import BlockIcon from '../../Images/SVGs/Block_Icon.svg';

const ParentalControlPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newCPassword, setNewCPassword] = useState<string>('');

    const save_parental_control = no_double_clicks({
        execFunc: () => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeStack' }],
                }),
            );
        },
    });

    const nav_to_block_apps = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'BlockAppsPage',
                } as never,
            );
        },
    });

    return (
        <View style={styles.sub_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop: Platform.OS === 'ios' ? 65 : 30,
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
                    Security
                </Text>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    marginHorizontal: 2,
                    paddingHorizontal: 20,
                }}>
                <View
                    style={{
                        backgroundColor: Colors.LightPrimary,
                        height: 200,
                        marginVertical: 33,
                        borderRadius: 10,
                        padding: 22,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                backgroundColor: Colors.LightGreen,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 43,
                                height: 43,
                                borderRadius: 43,
                            }}>
                            <ParentalControlIcon
                                color={Colors.Green}
                                width={22}
                                height={22}
                            />
                        </View>
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_700,
                                fontSize: 20,
                                color: Colors.Dark,
                                marginLeft: 10,
                            }}>
                            Parental Control
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={nav_to_block_apps}
                        activeOpacity={0.6}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.Primary,
                            width: 145,
                            height: 50,
                            marginTop: 'auto',
                            marginBottom: 10,
                            borderRadius: 10,
                        }}>
                        <BlockIcon color={Colors.Orange} />
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_500,
                                fontSize: 17,
                                color: Colors.White,
                                marginLeft: 7,
                            }}>
                            Block Apps
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        fontSize: 20,
                        lineHeight: 39,
                        color: Colors.Dark,
                    }}>
                    Change Password
                </Text>
                <Text style={styles.payment_h_txt}>Old Password</Text>
                <SecureTextEntry
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={oldPassword}
                    setInputValue={setOldPassword}
                    placeHolderText="Enter your old password"
                />
                <Text style={styles.payment_h_txt}>New Password</Text>
                <SecureTextEntry
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={newPassword}
                    setInputValue={setNewPassword}
                    placeHolderText="Enter a new password"
                />
                <Text style={styles.payment_h_txt}>Confirm Password</Text>
                <SecureTextEntry
                    marginHorizontal={0.01}
                    marginTop={10}
                    inputValue={newCPassword}
                    setInputValue={setNewCPassword}
                    placeHolderText="Confirm your new password"
                />
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <BasicButton
                buttonText="Save"
                marginHorizontal={22}
                marginTop={'auto'}
                marginBottom={Platform.OS === 'ios' ? 50 : 20}
                execFunc={save_parental_control}
            />
        </View>
    );
};

export default ParentalControlPage;

const styles = StyleSheet.create({
    sub_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    payment_h_txt: {
        color: Colors.Dark,
        fontSize: 15,
        fontFamily: fonts.Urbanist_500,
        marginTop: 20,
    },
});

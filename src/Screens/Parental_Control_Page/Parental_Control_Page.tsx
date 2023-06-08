import React, { Fragment, FunctionComponent, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import ParentalControlIcon from '../../Images/SVGs/Parental_Control_Icon.svg';
import BlockIcon from '../../Images/SVGs/Block_Icon.svg';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import { Observer } from 'mobx-react';

const ParentalControlPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [pcPIN, setPCPIN] = useState<string>('');
    const [showBlockApps, setShowBlockApps] = useState<boolean>(false);

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

    const enable_block_apps = no_double_clicks({
        execFunc: () => {
            if (pcPIN) {
                setShowBlockApps(true);
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Invalid PIN!',
                });
            }
        },
    });

    return (
        <View style={styles.sub_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 45,
                                  if_false: 65,
                              })
                            : 30,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Security"
                    textWeight={700}
                    textSize={20}
                    marginLeft={10}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 2,
                    paddingHorizontal: 20,
                }}>
                {!showBlockApps && (
                    <View style={{ flex: 1 }}>
                        <Fragment>
                            <BasicText
                                inputText="Enter Parental Control PIN"
                                textSize={20}
                                textWeight={700}
                                marginTop={40}
                                textColor={Colors.Dark}
                            />
                            <BasicText
                                inputText="PIN"
                                textSize={15}
                                textWeight={500}
                                marginTop={20}
                                textColor={Colors.Dark}
                            />
                            <Observer>
                                {() => (
                                    <SecureTextEntry
                                        marginHorizontal={0.01}
                                        marginTop={10}
                                        inputValue={pcPIN}
                                        setInputValue={setPCPIN}
                                        placeHolderText="Enter your PIN"
                                        inputMode="numeric"
                                        marginBottom={
                                            KeyboardStore.keyboard_active
                                                ? 20
                                                : 'auto'
                                        }
                                    />
                                )}
                            </Observer>
                        </Fragment>
                        <BasicButton
                            buttonText="Continue"
                            execFunc={enable_block_apps}
                        />
                    </View>
                )}
                {showBlockApps && (
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
                            <BasicText
                                inputText="Parental Control"
                                textWeight={700}
                                textSize={20}
                                marginLeft={10}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={nav_to_block_apps}
                            activeOpacity={0.6}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.Primary,
                                width: 175,
                                height: 50,
                                marginTop: 'auto',
                                marginBottom: 10,
                                borderRadius: 10,
                            }}>
                            <BlockIcon color={Colors.Orange} />
                            <BasicText
                                inputText="Parental Control"
                                textWeight={500}
                                textSize={17}
                                textColor={Colors.White}
                                marginLeft={7}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View
                    style={{
                        marginBottom:
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_true: 10,
                                      if_false: 40,
                                  })
                                : 20,
                    }}>
                    {''}
                </View>
            </View>
        </View>
    );
};

export default ParentalControlPage;

const styles = StyleSheet.create({
    sub_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import DisplayAvatar from '../../Components/Display_Avatar/Display_Avatar';
import Feather from 'react-native-vector-icons/Feather';
import VoiceOverIcon from '../../Images/SVGs/Voice_Over_Icon.svg';
import { Avatars } from '../../Data/Voices/Voices';

const CustomizeVoicePage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [isMaleTutor, setIsMaleTutor] = useState<boolean>(false);
    const [activeVoice, setActiveVoice] = useState<number>(0);

    const save_character_customization = no_double_clicks({
        execFunc: () => {},
    });

    return (
        <View style={styles.acp_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors.Background}
                backgroundDimColor={Colors.BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
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
                    Customize Voice
                </Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <DisplayAvatar
                    isMale={isMaleTutor}
                    marginBottom={20}
                    marginTop={30}
                    marginHorizontal={22}
                />
                <View
                    style={{
                        marginHorizontal: 22,
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.65}
                        style={{
                            borderWidth: 1,
                            alignItems: 'center',
                            width: 70,
                            height: 90,
                            borderRadius: 8,
                            borderColor: Colors.LightPurple,
                        }}>
                        <View
                            style={{
                                padding: 9,
                                marginTop: 10,
                                backgroundColor: Colors.LightPurple,
                                borderRadius: 20,
                                marginBottom: 4,
                            }}>
                            <Feather
                                name="volume-2"
                                color={Colors.DarkGrey}
                                size={20}
                            />
                        </View>
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_500,
                                color: Colors.Dark,
                                fontSize: 15,
                            }}>
                            Listen
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            backgroundColor: Colors.LightPurple4,
                            marginLeft: 10,
                            borderRadius: 8,
                            flex: 1,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 20,
                                marginTop: 10,
                                marginBottom: 15,
                                alignItems: 'center',
                            }}>
                            <VoiceOverIcon
                                color={Colors.Primary}
                                width={25}
                                height={25}
                            />
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_600,
                                    fontSize: 17,
                                    color: Colors.Dark,
                                    marginLeft: 10,
                                }}>
                                Select Voice
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                marginHorizontal: 22,
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}>
                            {(isMaleTutor
                                ? Avatars?.Male
                                : Avatars?.Female
                            )?.map((item, index) => (
                                <TouchableOpacity
                                    style={{
                                        width: 100,
                                        height: 60,
                                        backgroundColor: Colors.White,
                                        marginRight: 15,
                                        marginBottom: 10,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth:
                                            index === activeVoice ? 1 : 0,
                                        borderColor:
                                            index === activeVoice
                                                ? Colors.Primary
                                                : undefined,
                                    }}
                                    activeOpacity={0.55}
                                    onPress={() => setActiveVoice(index)}
                                    key={index}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.Urbanist_700,
                                            color: Colors.Dark,
                                            fontSize: 15,
                                        }}>
                                        {item?.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.Urbanist_500,
                                            color: Colors.Dark,
                                            fontSize: 12,
                                        }}>{`${item?.type} Male`}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Save"
                borderRadius={8}
                marginHorizontal={22}
                buttonHeight={56}
                disabled={disableButton}
                marginTop={'auto'}
                marginBottom={Platform.OS === 'ios' ? 50 : 20}
                execFunc={save_character_customization}
            />
        </View>
    );
};

export default CustomizeVoicePage;

const styles = StyleSheet.create({
    acp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        marginBottom: Platform.OS === 'ios' ? 25 : 5,
    },
});

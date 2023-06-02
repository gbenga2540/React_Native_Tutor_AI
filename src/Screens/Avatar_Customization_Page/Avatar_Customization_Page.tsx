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
import BasicButton2 from '../../Components/Basic_Button_2/Basic_Button_2';
import { avatars_data } from '../../Data/Avatars/Avatars';

const AvatarCustomizationPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [isMaleTutor, setIsMaleTutor] = useState<boolean>(false);

    const save_character_customization = no_double_clicks({
        execFunc: () => {},
    });

    const nav_to_customize_voice = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'CustomizeVoicePage',
                } as never,
            );
        },
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
                    marginTop: Platform.OS === 'ios' ? 65 : 25,
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
                    Avatar Customization
                </Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <DisplayAvatar
                    isMale={isMaleTutor}
                    marginBottom={20}
                    marginTop={30}
                    marginHorizontal={22}
                />
                <BasicButton2
                    buttonText="Customize"
                    borderRadius={8}
                    marginHorizontal={22}
                    buttonHeight={56}
                    backgroundColor={Colors.Primary}
                    textColor={Colors.Primary}
                    marginBottom={40}
                    execFunc={nav_to_customize_voice}
                />
                <Text style={styles.acp_txt}>Select New Avatar</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginHorizontal: 22,
                        marginBottom: 20,
                    }}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={[
                                    styles.avatar_bg,
                                    {
                                        backgroundColor: Colors.LightPink,
                                        marginRight: 20,
                                    },
                                ]}
                                onPress={() => setIsMaleTutor(false)}>
                                <View>
                                    {isMaleTutor && (
                                        <View style={styles.avatar_bg_overlay}>
                                            {''}
                                        </View>
                                    )}
                                    <Image
                                        source={avatars_data[0]?.image}
                                        style={{
                                            width: 130,
                                            height: 130,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={styles.avatar_bg}
                                onPress={() => setIsMaleTutor(true)}>
                                <View>
                                    {!isMaleTutor && (
                                        <View style={styles.avatar_bg_overlay}>
                                            {''}
                                        </View>
                                    )}
                                    <Image
                                        source={avatars_data[6]?.image}
                                        style={{
                                            width: 130,
                                            height: 130,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
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

export default AvatarCustomizationPage;

const styles = StyleSheet.create({
    acp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        paddingBottom: Platform.OS === 'ios' ? 25 : 5,
    },
    acp_m_wt2: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        lineHeight: 24,
        marginHorizontal: 22,
        color: Colors.Grey,
    },
    acp_txt: {
        fontFamily: fonts.Urbanist_500,
        marginHorizontal: 22,
        color: Colors.Dark,
        fontSize: 16,
    },
    avatar_bg: {
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        marginBottom: 10,
    },
    avatar_bg_overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(220, 220, 220, 0.7)',
        width: '100%',
        height: '100%',
        zIndex: 2,
        borderRadius: 20,
    },
});

import React, { FunctionComponent, useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';
import PhoneNumberInput from '../../Components/Phone_Number_Input/Phone_Number_Input';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import { NativeLanguagesChooser } from '../../Data/Languages/Languages';
import TextButton from '../../Components/Text_Button/Text_Button';
import { mongo_date_converter_4 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import { get_age } from '../../Utils/Get_Age/Get_Age';
import DatePicker from 'react-native-date-picker';
import { useRef } from 'react';
import { useEffect } from 'react';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const PersonalDetailsPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const scrollViewRef = useRef<ScrollView | null>(null);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [phoneNoValid, setPhoneNoValid] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('');
    const [dob, setDOB] = useState<Date>(() => {
        const _date = new Date();
        _date.setFullYear(_date.getFullYear() - 15);
        return _date;
    });
    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [agePHColor, setAgePHColor] = useState<string>(Colors.Grey);
    const [displayPicture, setDisplayPicture] = useState<string>('');
    const open_dob = no_double_clicks({
        execFunc: () => {
            setOpenDateModal(true);
        },
    });

    const edit_personal_details = no_double_clicks({
        execFunc: () => {
            if (regex_email_checker({ email: email })) {
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Email field cannot be empty!',
                });
            }
        },
    });

    const clear_image = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            setDisplayPicture('');
            ImagePicker.clean();
        },
    });

    const select_image_from_gallery = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            try {
                ImagePicker.openPicker({
                    width: 400,
                    height: 400,
                    cropping: true,
                    multiple: false,
                    includeBase64: true,
                    enableRotationGesture: true,
                    forceJpg: true,
                })
                    .catch(err => {
                        setDisplayPicture('');
                        if (err) {
                            clear_image();
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
                clear_image();
            }
        },
    });

    const select_image_from_camera = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            try {
                ImagePicker.openCamera({
                    width: 400,
                    height: 400,
                    cropping: true,
                    multiple: false,
                    includeBase64: true,
                    enableRotationGesture: true,
                    forceJpg: true,
                })
                    .catch(err => {
                        setDisplayPicture('');
                        if (err) {
                            clear_image();
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
                clear_image();
            }
        },
    });

    useEffect(() => {
        const first_timer = setTimeout(() => {
            scrollViewRef.current !== null &&
                scrollViewRef.current?.scrollToEnd();
        }, 500);
        return () => clearTimeout(first_timer);
    }, []);

    return (
        <View style={styles.pdp_main}>
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
                    inputText="Personal Details"
                    textWeight={700}
                    marginLeft={10}
                    textSize={20}
                />
            </View>
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 40,
                        marginHorizontal: 22,
                    }}>
                    <View style={styles.pdp_i_c_w}>
                        <View style={styles.pdp_i_c}>
                            {displayPicture ? (
                                <Image
                                    style={styles.pdp_i}
                                    source={{
                                        uri: displayPicture,
                                        width: 150,
                                        height: 150,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.pdp_i}
                                    source={require('../../Images/Extra/default_user_dp_light.jpg')}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.pdp_sp_w}>
                        <TouchableOpacity
                            onPress={select_image_from_camera}
                            style={[
                                styles.pdp_sp_i,
                                {
                                    backgroundColor: Colors.Border,
                                },
                            ]}>
                            <Feather
                                name="camera"
                                size={28}
                                color={Colors.DarkGrey}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={select_image_from_gallery}
                            style={[
                                styles.pdp_sp_i,
                                {
                                    backgroundColor: Colors.Border,
                                },
                            ]}>
                            <Feather
                                name="image"
                                size={28}
                                color={Colors.DarkGrey}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={clear_image}
                            style={[
                                styles.pdp_sp_i,
                                {
                                    backgroundColor: Colors.Border,
                                },
                            ]}>
                            <Feather
                                name="x"
                                size={28}
                                color={Colors.DarkGrey}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <BasicText
                    inputText="Language"
                    marginLeft={22}
                    textWeight={500}
                />
                <RNDropDown
                    dropdownData={NativeLanguagesChooser}
                    value={language}
                    setValue={setLanguage}
                    height={56}
                    width={Dimensions?.get('window')?.width - 44}
                    disable={false}
                    paddingHorizontal={7}
                    marginRight={22}
                    marginLeft={22}
                    marginTop={10}
                    marginBottom={30}
                />
                <BasicText
                    inputText="Full Name"
                    marginLeft={22}
                    textWeight={500}
                />
                <BasicTextEntry
                    placeHolderText="John Doe"
                    inputValue={email}
                    setInputValue={setEmail}
                    marginTop={10}
                    marginBottom={30}
                    inputMode="text"
                />
                <BasicText
                    inputText="Phone Number"
                    marginLeft={22}
                    textWeight={500}
                />
                <PhoneNumberInput
                    setInputValue={setPhoneNo}
                    setIsValid={setPhoneNoValid}
                    defaultCode="US"
                    marginTop={10}
                />
                <BasicText inputText="Email" marginLeft={22} textWeight={500} />
                <BasicTextEntry
                    placeHolderText="johndoe@gmail.com"
                    inputValue={email}
                    setInputValue={setEmail}
                    marginTop={10}
                    marginBottom={30}
                    inputMode="text"
                />
                <BasicText
                    inputText="Date of Birth"
                    marginLeft={22}
                    textWeight={500}
                />
                <BasicTextEntry
                    placeHolderText={mongo_date_converter_4({
                        input_date: new Date()?.toString(),
                    })}
                    inputValue={`${mongo_date_converter_4({
                        input_date: dob?.toString(),
                    })} - ${
                        get_age({
                            input_date: dob?.toString(),
                        }) === 0
                            ? ''
                            : get_age({
                                  input_date: dob?.toString(),
                              })
                    } ${
                        get_age({
                            input_date: dob?.toString(),
                        }) === 1
                            ? 'year old'
                            : get_age({
                                  input_date: dob?.toString(),
                              }) === 0
                            ? 'Select your Date of Birth'
                            : 'years old'
                    }`}
                    setInputValue={setDOB as any}
                    marginTop={15}
                    marginBottom={7}
                    inputMode="text"
                    editable={false}
                    textColor={agePHColor}
                />
                <TextButton
                    buttonText="Select Date"
                    marginLeft={'auto'}
                    marginRight={22}
                    marginBottom={10}
                    execFunc={open_dob}
                    textColor={Colors.LightPink}
                />
                <BasicButton
                    buttonText="Edit Details"
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={edit_personal_details}
                    buttonHeight={56}
                    disabled={disableButton}
                    marginTop={20}
                    marginBottom={
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 30,
                              })
                            : 20
                    }
                />
            </ScrollView>
            <DatePicker
                modal
                mode="date"
                open={openDateModal}
                date={dob}
                maximumDate={new Date()}
                onConfirm={new_date => {
                    setAgePHColor(Colors.Dark);
                    setOpenDateModal(false);
                    setDOB(new_date);
                }}
                onCancel={() => {
                    setOpenDateModal(false);
                }}
            />
        </View>
    );
};

export default PersonalDetailsPage;

const styles = StyleSheet.create({
    pdp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        paddingBottom: Platform.OS === 'ios' ? 25 : 5,
    },
    pdp_i_c_w: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 160,
        padding: 3,
        borderColor: Colors.DarkGrey,
        marginBottom: 5,
    },
    pdp_i_c: {
        borderRadius: 150,
    },
    pdp_i: {
        borderRadius: 150,
        width: 150,
        height: 150,
    },
    pdp_sp_w: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 140,
        marginTop: 30,
    },
    pdp_sp_i: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
    },
});

import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from 'react-query';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { suggest_tag } from '../../Configs/Queries/Suggest_Tag/Suggest_Tag';

const SuggestTagPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [tagName, setTagName] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: suggest_tag_mutate } = useMutation(suggest_tag, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            setDisableButton(false);
            setShowSpinner(false);
            if (data?.error) {
                error_handler({
                    navigation: navigation,
                    error_mssg: data?.data,
                });
            } else {
                setTagName('');
                info_handler({
                    navigation: navigation,
                    proceed_type: 3,
                    hide_back_btn: true,
                    hide_header: false,
                    success_mssg: 'Tag Name uploaded Successfully!',
                });
            }
        },
    });

    const suggest_tag_func = no_double_clicks({
        execFunc: () => {
            if (tagName) {
                suggest_tag_mutate({
                    tagName: tagName,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Tag field cannot be empty!',
                });
            }
        },
    });

    return (
        <View style={styles.stp_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: navigation?.canGoBack()
                        ? Platform?.OS === 'ios'
                            ? 56
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 28,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <Text style={styles.stp_m_wt}>Suggest a Tag Name?</Text>
            <Text style={styles.stp_m_wt2}>
                {
                    "Please enter your 'Tag Name' below and click 'Send Tag' to upload your Tag Name."
                }
            </Text>
            <BasicTextEntry
                placeHolderText="Enter your Tag Name here..."
                inputValue={tagName}
                setInputValue={setTagName}
                marginBottom={15}
            />
            <BasicButton
                buttonText="Send Tag"
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={suggest_tag_func}
                buttonHeight={56}
                disabled={disableButton}
            />
        </View>
    );
};

export default SuggestTagPage;

const styles = StyleSheet.create({
    stp_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    stp_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
    },
    stp_m_wt2: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 22,
        marginRight: 22,
        color: Colors().Grey,
        marginBottom: 22,
        maxWidth: 330,
    },
});

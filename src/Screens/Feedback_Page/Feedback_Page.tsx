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
import { post_feedback } from '../../Configs/Queries/Feedback/Feedback';

const FeedbackPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [feedback, setFeedback] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: post_feedback_mutate } = useMutation(post_feedback, {
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
                setFeedback('');
                info_handler({
                    navigation: navigation,
                    proceed_type: 3,
                    hide_back_btn: true,
                    hide_header: false,
                    success_mssg: 'Review uploaded Successfully!',
                });
            }
        },
    });

    const post_feedback_func = no_double_clicks({
        execFunc: () => {
            if (feedback) {
                post_feedback_mutate({
                    feedback: feedback,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Feedback field cannot be empty!',
                });
            }
        },
    });

    return (
        <View style={styles.fp_main}>
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
            <Text style={styles.fp_m_wt}>Send a Feedback?</Text>
            <Text style={styles.fp_m_wt2}>
                {
                    "Please enter your feedback or review below and click 'Send Review' to upload your review."
                }
            </Text>
            <BasicTextEntry
                placeHolderText="Enter your review here..."
                inputValue={feedback}
                setInputValue={setFeedback}
                marginBottom={15}
            />
            <BasicButton
                buttonText="Send Review"
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={post_feedback_func}
                buttonHeight={56}
                disabled={disableButton}
            />
        </View>
    );
};

export default FeedbackPage;

const styles = StyleSheet.create({
    fp_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    fp_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
    },
    fp_m_wt2: {
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

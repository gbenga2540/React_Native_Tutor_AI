import React, { FunctionComponent } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const TCPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={styles.sign_in_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
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
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <Text style={styles.text}>
                    By accessing or using the Tutor AI application, you agree to
                    be bound by these Terms and Conditions. If you do not agree
                    with any part of these Terms and Conditions, you must not
                    use the App.
                </Text>
                <Text style={styles.heading}>Services Offered</Text>
                <Text style={styles.text}>
                    The Tutor AI application provides online tutoring services,
                    academic resources, and educational content to registered
                    users for their educational purposes. The App may include
                    features such as live chat, video lessons, study materials,
                    and interactive quizzes.
                </Text>
                <Text style={styles.heading}>User Responsibilities</Text>
                <Text style={styles.text}>
                    1. Eligibility: By using the App, you represent that you are
                    at least 15 years old or have obtained parental consent to
                    use the App if you are under the age of 15.
                </Text>
                <Text style={styles.text}>
                    2. Account Security: You are responsible for maintaining the
                    confidentiality of your account login credentials and are
                    solely responsible for any activity that occurs under your
                    account.
                </Text>
                <Text style={styles.text}>
                    3. Appropriate Use: You agree to use the App in compliance
                    with all applicable laws and regulations. You must not use
                    the App for any illegal, fraudulent, or unauthorized
                    purposes. You shall not engage in any activities that may
                    disrupt or interfere with the functioning of the App or
                    compromise its security.
                </Text>
                <Text style={styles.heading}>Usage Limitations</Text>
                <Text style={styles.text}>
                    1. Prohibited Activities: You shall not engage in any of the
                    following activities while using the App: Attempt to gain
                    unauthorized access to the App or its related systems or
                    networks. Modify, adapt, translate, or reverse-engineer the
                    App. Use the App for any illegal, harmful, or offensive
                    purposes. Violate any applicable laws or regulations.
                </Text>
                <Text style={styles.text}>
                    2. Content Usage: You may access and use the educational
                    content provided through the App solely for your personal
                    educational purposes. You must not distribute, sell, or
                    otherwise commercially exploit the content without the
                    Company's prior written consent.
                </Text>
            </ScrollView>
        </View>
    );
};

export default TCPage;

const styles = StyleSheet.create({
    sign_in_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    si_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 29,
        marginLeft: 22,
        marginRight: 2,
        color: Colors.Dark,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 26,
        marginBottom: 10,
        color: Colors.Primary,
        fontFamily: fonts.Urbanist_700,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: Colors.Black,
        fontFamily: fonts.Urbanist_600,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: Colors.DarkGrey,
        fontFamily: fonts.Urbanist_500,
    },
});

import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const TCPage: FunctionComponent = () => {
        return (
                <View style={styles.sign_in_main}>
                        <CustomStatusBar backgroundColor={Colors.Background} />
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
                                                marginLeft: 10,
                                                fontFamily: fonts.Urbanist_700,
                                                color: Colors.Primary,
                                                fontSize: 20,
                                        }}>
                                        Terms and Conditions
                                </Text>
                        </View>
                        <ScrollView style={styles.container}>
                                <Text style={styles.heading}>Welcome to Tutor.AI</Text>
                                <Text style={styles.text}>
                                        These terms and conditions outline the rules and regulations for the use of Tutor.ai's Website, located at tutor.ai. By accessing this website we assume you accept these terms and conditions. Do not continue to use Tutor.ai if you do not agree to take all of
                                        the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to
                                        the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary
                                        to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of us. Any
                                        use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                                </Text>
                                <Text style={styles.heading}>Cookies</Text>
                                <Text style={styles.text}>
                                        We employ the use of cookies. By accessing Tutor.ai, you agreed to use cookies in agreement with the Tutor.ai's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to
                                        enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/ advertising partners may also use cookies.
                                </Text>
                                <Text style={styles.heading}>License</Text>
                                <Text style={styles.text}>
                                        Unless otherwise stated, Tutor.ai and/or its licensors own the intellectual property rights for all material on Tutor.ai. All intellectual property rights are reserved. You may access this from Tutor.ai for your own personal use subjected to restrictions set
                                        in these terms and conditions. You must not:
                                </Text>
                                <Text style={styles.text}>- Republish material from Tutor.ai</Text>
                                <Text style={styles.text}>- Sell, rent or sub-license material from Tutor.ai</Text>
                                <Text style={styles.text}>- Reproduce, duplicate or copy material from Tutor.ai</Text>
                                <Text style={styles.text}>- Redistribute content from Tutor.ai</Text>
                                <View style={{ marginBottom: 80 }}>{''}</View>
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

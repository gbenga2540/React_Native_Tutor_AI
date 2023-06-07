import React, { FunctionComponent } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const TCPage: FunctionComponent = () => {
    return (
        <View style={styles.t_c_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
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
                    inputText="Terms and Conditions"
                    textWeight={700}
                    textColor={Colors.Primary}
                    textSize={20}
                    marginLeft={10}
                />
            </View>
            <ScrollView style={styles.container}>
                <BasicText
                    inputText="Welcome to Tutor.AI"
                    textWeight={700}
                    textColor={Colors.Black}
                    marginTop={20}
                    textSize={20}
                    marginBottom={10}
                />
                <BasicText
                    inputText="These terms and conditions outline the rules and regulations
                    for the use of Tutor.ai's Website, located at tutor.ai. By
                    accessing this website we assume you accept these terms and
                    conditions. Do not continue to use Tutor.ai if you do not
                    agree to take all of the terms and conditions stated on this
                    page. The following terminology applies to these Terms and
                    Conditions, Privacy Statement and Disclaimer Notice and all
                    Agreements: 'Client', 'You' and 'Your' refers to you, the
                    person log on this website and compliant to the Company's
                    terms and conditions. 'The Company', 'Ourselves', 'We',
                    'Our' and 'Us', refers to our Company. 'Party', 'Parties',
                    or 'Us', refers to both the Client and ourselves. All terms
                    refer to the offer, acceptance and consideration of payment
                    necessary to undertake the process of our assistance to the
                    Client in the most appropriate manner for the express
                    purpose of meeting the Client's needs in respect of
                    provision of the Company's stated services, in accordance
                    with and subject to, prevailing law of us. Any use of the
                    above terminology or other words in the singular, plural,
                    capitalization and/or he/she or they, are taken as
                    interchangeable and therefore as referring to same."
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <BasicText
                    inputText="Cookies"
                    textWeight={700}
                    textColor={Colors.Black}
                    marginTop={20}
                    textSize={20}
                    marginBottom={10}
                />
                <BasicText
                    inputText="We employ the use of cookies. By accessing Tutor.ai, you
                    agreed to use cookies in agreement with the Tutor.ai's
                    Privacy Policy. Most interactive websites use cookies to let
                    us retrieve the user's details for each visit. Cookies are
                    used by our website to enable the functionality of certain
                    areas to make it easier for people visiting our website.
                    Some of our affiliate/ advertising partners may also use
                    cookies."
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <BasicText
                    inputText="License"
                    textWeight={700}
                    textColor={Colors.Black}
                    marginTop={20}
                    textSize={20}
                    marginBottom={10}
                />
                <BasicText
                    inputText="Unless otherwise stated, Tutor.ai and/or its licensors own
                    the intellectual property rights for all material on
                    Tutor.ai. All intellectual property rights are reserved. You
                    may access this from Tutor.ai for your own personal use
                    subjected to restrictions set in these terms and conditions.
                    You must not:"
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <BasicText
                    inputText="- Republish material from Tutor.ai"
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <BasicText
                    inputText="- Sell, rent or sub-license material from Tutor.ai"
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <BasicText
                    inputText="- Reproduce, duplicate or copy material from Tutor.ai"
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <BasicText
                    inputText="- Redistribute content from Tutor.ai"
                    textColor={Colors.Grey}
                    marginBottom={10}
                    textSize={16}
                    textWeight={500}
                />
                <View style={{ marginBottom: 80 }}>{''}</View>
            </ScrollView>
        </View>
    );
};

export default TCPage;

const styles = StyleSheet.create({
    t_c_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: {
        flex: 1,
        padding: 20,
        marginBottom:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_true: 10,
                      if_false: 20,
                  })
                : 5,
    },
});

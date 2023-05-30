import React, { FunctionComponent, useState } from 'react';
import {
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
import HeaderTab from '../../Components/Header_Tab/Header_Tab';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import { faq_types, faqs } from '../../Data/FAQ/FAQ';
import FAQReader from '../../Components/FAQ_Reader/FAQ_Reader';
import { contact_us } from '../../Data/Contact_Us/Contact_Us';
import ContactUsButton from '../../Components/Contact_Us_Button/Contact_Us_Button';

const HelpCenterPage: FunctionComponent = () => {
    const [search, setSearch] = useState<string>('');
    const [activeFAQ, setActiveFAQ] = useState<number>(0);

    const [currentTAB, setCurrentTAB] = useState<number>(1);

    return (
        <View style={styles.hcp_main}>
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
                        marginLeft: 30,
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Dark,
                        fontSize: 20,
                    }}>
                    Help Center
                </Text>
            </View>
            <ScrollView style={{ flex: 1, marginHorizontal: 24 }}>
                <HeaderTab
                    marginTop={20}
                    marginBottom={20}
                    header_1="FAQ"
                    header_2="Contact Us"
                    marginBetween={4}
                    execFunc_Header_1={() => setCurrentTAB(1)}
                    execFunc_Header_2={() => setCurrentTAB(2)}
                />
                {currentTAB === 1 && (
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                                flexDirection: 'row',
                                marginBottom: 12,
                            }}>
                            {faq_types?.map((item, index) => (
                                <TouchableOpacity
                                    style={{
                                        borderWidth:
                                            activeFAQ !== index ? 1.3 : 0,
                                        paddingVertical: 8,
                                        paddingHorizontal: 13,
                                        marginRight: 12,
                                        borderRadius: 20,
                                        borderColor:
                                            activeFAQ !== index
                                                ? Colors.Primary
                                                : undefined,

                                        backgroundColor:
                                            activeFAQ === index
                                                ? Colors.Primary
                                                : Colors?.White,
                                    }}
                                    onPress={() => setActiveFAQ(index)}
                                    key={index}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.Urbanist_500,
                                            fontSize: 15,
                                            color:
                                                activeFAQ === index
                                                    ? Colors.White
                                                    : Colors.Primary,
                                        }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <SearchBar
                            inputValue={search}
                            setInputValue={setSearch}
                            placeHolderText="search"
                            marginBottom={30}
                        />
                        {faqs?.map((item, index) => (
                            <FAQReader key={index} faq={item} />
                        ))}
                    </View>
                )}
                {currentTAB === 2 &&
                    contact_us?.map((item, index) => (
                        <ContactUsButton contact_us={item} key={index} />
                    ))}
            </ScrollView>
        </View>
    );
};

export default HelpCenterPage;

const styles = StyleSheet.create({
    hcp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

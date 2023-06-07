import React, { FunctionComponent, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import HeaderTab from '../../Components/Header_Tab/Header_Tab';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import { faq_types, faqs } from '../../Data/FAQ/FAQ';
import FAQReader from '../../Components/FAQ_Reader/FAQ_Reader';
import { contact_us } from '../../Data/Contact_Us/Contact_Us';
import ContactUsButton from '../../Components/Contact_Us_Button/Contact_Us_Button';
import { RouteProp, useRoute } from '@react-navigation/native';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const HelpCenterPage: FunctionComponent = () => {
    const route = useRoute<RouteProp<any>>();
    const [search, setSearch] = useState<string>('');
    const [activeFAQ, setActiveFAQ] = useState<number>(0);

    const [currentTAB, setCurrentTAB] = useState<number>(
        route.params?.is_contact_page ? 2 : 1,
    );
    return (
        <View style={styles.hcp_main}>
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
                    inputText={
                        currentTAB === 2
                            ? 'Contact Us'
                            : 'Frequently Asked Questions'
                    }
                    textWeight={700}
                    marginLeft={15}
                    textSize={20}
                />
            </View>
            <View
                style={{
                    minHeight: 50,
                    marginTop: 20,
                    marginBottom: 20,
                    marginHorizontal: 22,
                }}>
                <HeaderTab
                    header_1="FAQ"
                    header_2="Contact Us"
                    marginBetween={4}
                    execFunc_Header_1={() => setCurrentTAB(1)}
                    execFunc_Header_2={() => setCurrentTAB(2)}
                    secondIsInitialTab={currentTAB === 2}
                />
            </View>
            {currentTAB === 1 && (
                <View
                    style={{
                        flex: 1,
                        marginBottom:
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_true: 10,
                                      if_false: 20,
                                  })
                                : 5,
                    }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            flexDirection: 'row',
                            marginBottom: 12,
                            marginHorizontal: 22,
                            maxHeight: 40,
                        }}>
                        {faq_types?.map((item, index) => (
                            <TouchableOpacity
                                style={{
                                    borderWidth: activeFAQ !== index ? 1.3 : 0,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
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
                                <BasicText
                                    inputText={item}
                                    textColor={
                                        activeFAQ === index
                                            ? Colors.White
                                            : Colors.Primary
                                    }
                                    textWeight={500}
                                    textSize={15}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View
                        style={{
                            height: 56,
                            marginBottom: 5,
                            marginHorizontal: 22,
                        }}>
                        <SearchBar
                            inputValue={search}
                            setInputValue={setSearch}
                            placeHolderText="search"
                        />
                    </View>
                    <ScrollView
                        style={{
                            flex: 1,
                            marginHorizontal: 2,
                            paddingHorizontal: 22,
                            paddingTop: 20,
                        }}>
                        {faqs?.map((item, index) => (
                            <FAQReader key={index} faq={item} />
                        ))}
                    </ScrollView>
                </View>
            )}
            {currentTAB === 2 && (
                <ScrollView
                    style={{
                        paddingHorizontal: 20,
                        marginHorizontal: 2,
                        marginBottom:
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_true: 10,
                                      if_false: 20,
                                  })
                                : 5,
                    }}>
                    {contact_us?.map((item, index) => (
                        <ContactUsButton contact_us={item} key={index} />
                    ))}
                </ScrollView>
            )}
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

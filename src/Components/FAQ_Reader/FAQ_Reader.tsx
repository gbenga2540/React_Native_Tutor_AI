import React, { FunctionComponent, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { INTF_FAQ } from '../../Interface/FAQ/FAQ';
import DownArrowIcon from '../../Images/SVGs/Down_Arrow_Icon.svg';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import TextDivider from '../Text_Divider/Text_Divider';

interface FAQReaderProps {
    faq: INTF_FAQ;
}
const FAQReader: FunctionComponent<FAQReaderProps> = ({ faq }) => {
    const [openFAQ, setOpenFAQ] = useState<boolean>(false);

    return (
        <View>
            {openFAQ ? (
                <TouchableOpacity
                    activeOpacity={0.55}
                    onPress={() => setOpenFAQ(!openFAQ)}
                    style={{
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: Colors.DarkBorder,
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 50,
                            marginHorizontal: 20,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_700,
                                color: Colors.Dark,
                                fontSize: 15,
                            }}>
                            {faq.faq_title}
                        </Text>
                        <DownArrowIcon
                            style={{
                                marginLeft: 'auto',
                                transform: [
                                    {
                                        rotate: '180deg',
                                    },
                                ],
                            }}
                            color={Colors.Primary}
                        />
                    </View>
                    <TextDivider
                        singleLine
                        marginBottom={10}
                        marginHorizontal={18}
                    />
                    <Text
                        style={{
                            fontFamily: fonts.Urbanist_500,
                            color: Colors.Dark,
                            fontSize: 15,
                            marginHorizontal: 22,
                            marginBottom: 16,
                        }}>
                        {faq.faq_body}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.55}
                    onPress={() => setOpenFAQ(!openFAQ)}
                    style={{
                        flexDirection: 'row',
                        height: 56,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: Colors.DarkBorder,
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.Urbanist_600,
                            color: Colors.Dark,
                            marginLeft: 20,
                            fontSize: 15,
                        }}>
                        {faq.faq_title}
                    </Text>
                    <DownArrowIcon
                        style={{
                            marginLeft: 'auto',
                            marginRight: 20,
                        }}
                        color={Colors.Primary}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FAQReader;

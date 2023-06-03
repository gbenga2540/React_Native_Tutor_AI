import React, { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { INTF_FAQ } from '../../Interface/FAQ/FAQ';
import DownArrowIcon from '../../Images/SVGs/Down_Arrow_Icon.svg';
import Colors from '../../Configs/Colors/Colors';
import TextDivider from '../Text_Divider/Text_Divider';
import BasicText from '../Basic_Text/Basic_Text';

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
                        <BasicText
                            inputText={faq.faq_title}
                            textSize={15}
                            textWeight={700}
                        />
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
                    <BasicText
                        inputText={faq.faq_body}
                        textSize={15}
                        textWeight={500}
                        marginBottom={16}
                        marginLeft={22}
                        marginRight={22}
                    />
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
                    <BasicText
                        inputText={faq.faq_title}
                        textSize={15}
                        textWeight={600}
                        marginLeft={20}
                    />
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

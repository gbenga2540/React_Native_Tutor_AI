import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import ArcInnerIcon from '../../Images/SVGs/Arc_Inner_Icon.svg';
import ArcOuterIcon from '../../Images/SVGs/Arc_Outer_Icon.svg';
import { fonts } from '../../Configs/Fonts/Fonts';
import { INTF_Conversation } from '../../Interface/Conversation/Conversation';

interface ConversationCardProps {
    conversation: INTF_Conversation;
}
const ConversationCard: FunctionComponent<ConversationCardProps> = ({
    conversation,
}) => {
    return (
        <View
            style={[
                styles.conversation_main,
                { backgroundColor: Colors.LightPurple3 },
            ]}>
            <ArcInnerIcon
                style={{ position: 'absolute', right: 0 }}
                color={Colors.ArcInner_I}
            />
            <ArcOuterIcon
                style={{ position: 'absolute', right: 0 }}
                color={Colors.ArcOuter_I}
            />
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        marginLeft: 12,
                        marginTop: 10,
                        marginRight: 4,
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: Colors.ArcInner_I,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{
                            uri: conversation?.imageURL,
                            width: 88,
                            height: 88,
                        }}
                        style={{
                            borderRadius: 90,
                            width: 90,
                            height: 90,
                        }}
                    />
                </View>

                <View
                    style={{
                        width: 200,
                        paddingTop: 26,
                        paddingBottom: 12,
                    }}>
                    <Text
                        style={{
                            color: Colors.Black,
                            fontFamily: fonts.Urbanist_500,
                            fontSize: 15,
                        }}>
                        {`Lesson ${conversation?.topic_id}`}
                    </Text>
                    <Text
                        style={{
                            color: Colors.Black,
                            fontFamily: fonts.Urbanist_700,
                            fontSize: 18,
                        }}>
                        {conversation?.title}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ConversationCard;

const styles = StyleSheet.create({
    conversation_main: {
        minHeight: 120,
        borderRadius: 15,
        marginBottom: 17,
    },
});

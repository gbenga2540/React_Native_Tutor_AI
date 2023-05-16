import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { test_conversation } from '../../../test/Data/Lessons';
import { fonts } from '../../Configs/Fonts/Fonts';
import ConversationCard from '../../Components/Conversation_Card/Conversation_Card';

const ConversationPage: FunctionComponent = () => {
    return (
        <View style={styles.conversation_main}>
            <View style={styles.c_header_cont}>
                <Text style={styles.c_header}>Conversation</Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                    marginTop: 40,
                    paddingBottom: 20,
                }}>
                <FlatList
                    data={test_conversation}
                    keyExtractor={item => item.topic_id as any}
                    renderItem={({ item }) => (
                        <ConversationCard conversation={item} />
                    )}
                    style={{
                        paddingHorizontal: 18,
                    }}
                />
            </View>
        </View>
    );
};

export default ConversationPage;

const styles = StyleSheet.create({
    conversation_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        marginBottom: 100,
    },
    c_header_cont: {
        height: 120,
        paddingLeft: 22,
        backgroundColor: Colors.Background,
        shadowColor: 'rgba(0 ,0 ,0 , 0.35)',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
    },
    c_header: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 25,
        marginTop: 'auto',
        marginBottom: 18,
    },
});

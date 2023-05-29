import React, { FunctionComponent } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { test_conversation } from '../../../test/Data/Lessons';
import { fonts } from '../../Configs/Fonts/Fonts';
import ConversationCard from '../../Components/Conversation_Card/Conversation_Card';
import Feather from 'react-native-vector-icons/Feather';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const ConversationPage: FunctionComponent = () => {
    return (
        <View style={styles.conversation_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.c_header_cont}>
                <Text style={styles.c_header}>Conversation</Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                    marginTop: 14,
                    paddingBottom: 20,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Black,
                        fontSize: 20,
                        marginHorizontal: 22,
                    }}>
                    Assigned Class
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 30,
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                            backgroundColor: Colors.Primary,
                            width: 133,
                            height: 42,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 11,
                            flexDirection: 'row',
                            marginLeft: 22,
                        }}>
                        <Text
                            style={{
                                color: Colors.White,
                                fontFamily: fonts.Urbanist_600,
                                fontSize: 18,
                                marginRight: 3,
                            }}>
                            Confident
                        </Text>
                        <Feather
                            name="chevron-down"
                            size={21}
                            color={Colors.White}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            backgroundColor: Colors.LightPrimary,
                            width: 131,
                            height: 42,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 11,
                            marginLeft: 'auto',
                            marginRight: 22,
                        }}>
                        <Text
                            style={{
                                color: Colors.Primary,
                                fontFamily: fonts.Urbanist_600,
                                fontSize: 18,
                            }}>
                            20:00 Mins
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={test_conversation}
                    keyExtractor={item => item.topic_id as any}
                    renderItem={({ item }) => (
                        <ConversationCard conversation={item} />
                    )}
                    style={{
                        paddingHorizontal: 18,
                        marginBottom: 100,
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

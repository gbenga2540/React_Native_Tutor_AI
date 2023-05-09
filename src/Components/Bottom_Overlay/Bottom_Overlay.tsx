import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    BackHandler,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import { useMutation, useQueryClient } from 'react-query';
import { INTF_Tag } from '../../Interface/Tags/Tags';
import TagButton from '../Tag_Button/Tag_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../Basic_Button/Basic_Button';
import { SearchTagsStore } from '../../MobX/Search_Tags/Search_Tags';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import CommentCard from '../Comment_Card/Comment_Card';
import { CurrentCommentsStore } from '../../MobX/Current_Comments/Current_Comments';
import { INTF_Comments } from '../../Interface/Comments/Comments';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import { UserDataStore } from '../../MobX/User_Data/User_Data';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import BasicTextEntry from '../Basic_Text_Entry/Basic_Text_Entry';
import { create_comment } from '../../Configs/Queries/Blogs/Blogs';
import { INTF_BlogDetails } from '../../Interface/Blog_Details/Blog_Details';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { AppTagsStore } from '../../MobX/App_Tags/App_Tags';

const BottomOverlay: FunctionComponent = observer(() => {
    const queryClient = useQueryClient();
    const BottomSheetRef = useRef<BottomSheetMethods | null>(null);

    const [reply, setReply] = useState<string>('');

    const { mutate: create_comment_mutate } = useMutation(create_comment, {
        onMutate: () => {
            setReply('');
        },
        onSettled: data => {
            if (!data?.error) {
                queryClient.cancelQueries([
                    query_id({ id: CurrentCommentsStore?.current_blog_id })
                        ?.blog_with_id,
                ]);
                const old_data: {
                    error: boolean;
                    data: INTF_BlogDetails;
                } = queryClient.getQueryData(
                    query_id({ id: CurrentCommentsStore?.current_blog_id })
                        ?.blog_with_id,
                    // @ts-ignore
                ) as {
                    error: boolean;
                    data: INTF_BlogDetails;
                };
                const old_item: INTF_BlogDetails = old_data?.data;
                const new_item: INTF_BlogDetails = {
                    ...old_item,
                    comments: data?.data,
                    comments_l: (old_item?.comments_l as number) + 1,
                };
                queryClient?.setQueryData(
                    query_id({ id: CurrentCommentsStore?.current_blog_id })
                        ?.blog_with_id,
                    {
                        error: false,
                        data: new_item,
                    },
                );
            }
            queryClient.resumePausedMutations();
        },
    });

    const clear_search_tags_func = no_double_clicks({
        execFunc: () => {
            SearchTagsStore.clear_search_tags();
        },
    });

    const send_reply = no_double_clicks({
        execFunc: () => {
            if (reply) {
                create_comment_mutate({
                    blogID: CurrentCommentsStore.current_blog_id,
                    comment: reply,
                    user_token: UserInfoStore?.user_info?.token as string,
                });
            }
        },
    });

    if (BottomSheetRef?.current) {
        if (BottomSheetStore.is_bottom_sheet) {
            BottomSheetRef.current.expand();
        }
        if (!BottomSheetStore.is_bottom_sheet) {
            BottomSheetStore.close_bottom_sheet();
            BottomSheetRef?.current?.close();
        }
    }

    const BS_Snap_Points = () => {
        switch (BottomSheetStore.component_type) {
            case 0:
                return ['50'];
            case 1:
                return Platform.OS === 'ios' ? ['50', '80'] : ['55', '80'];
            case 2:
                return ['80'];
            case 3:
                return ['75'];
            default:
                return ['50'];
        }
    };

    const handleBackPress = () => {
        if (BottomSheetRef.current) {
            BottomSheetStore.close_bottom_sheet();
            BottomSheetRef?.current?.close();
            return true;
        }
        return false;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress,
        );
        return () => backHandler.remove();
    }, []);

    return (
        <BottomSheet
            ref={BottomSheetRef}
            snapPoints={BS_Snap_Points()}
            backgroundStyle={styles.bottom_sheet}
            enablePanDownToClose={true}
            containerStyle={{
                zIndex: 6,
            }}
            style={{
                borderRadius: 35,
                overflow: 'hidden',
            }}
            index={-1}
            onClose={() => {
                BottomSheetStore.close_bottom_sheet();
                BottomSheetRef?.current?.close();
            }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                {BottomSheetStore.component_type === 1 &&
                    AppTagsStore.app_tags?.length > 0 && (
                        <View
                            style={{
                                marginHorizontal: 22,
                                marginTop: 20,
                            }}>
                            <Text
                                style={{
                                    marginBottom: 13,
                                    fontFamily: fonts.OpenSans_700,
                                    fontSize: 20,
                                    color: Colors().Black,
                                }}>
                                Filter your Feeds:
                            </Text>
                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                }}>
                                {AppTagsStore?.app_tags?.map(
                                    (item: INTF_Tag, index: number) => (
                                        <TagButton tag={item} key={index} />
                                    ),
                                )}
                            </View>
                            <Text
                                style={{
                                    marginBottom: 10,
                                    fontFamily: fonts.OpenSans_700,
                                    fontSize: 20,
                                    marginTop: 20,
                                    color: Colors().Black,
                                }}>
                                Clear all filters:
                            </Text>
                            <BasicButton
                                buttonText="Clear Filters"
                                execFunc={clear_search_tags_func}
                            />
                        </View>
                    )}
                {BottomSheetStore.component_type === 2 && (
                    <BottomSheetScrollView>
                        <ScrollView
                            style={{
                                flex: 1,
                                paddingHorizontal: 20,
                                paddingTop: 30,
                                marginBottom: KeyboardStore.keyboard_active
                                    ? 300
                                    : 20,
                            }}>
                            {CurrentCommentsStore.current_comments?.length >
                                0 &&
                                CurrentCommentsStore.current_comments.map(
                                    (item: INTF_Comments) => (
                                        <CommentCard
                                            key={item?._id}
                                            comment={item}
                                        />
                                    ),
                                )}
                        </ScrollView>
                    </BottomSheetScrollView>
                )}
                {BottomSheetStore.component_type === 3 && (
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 20,
                            marginTop: 30,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            {UserDataStore?.user_data?.dp_link !== 'none' ||
                            !UserDataStore?.user_data?.dp_link ? (
                                <Image
                                    style={{
                                        borderRadius: 40,
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={{
                                        uri: UserDataStore?.user_data?.dp_link,
                                        width: 40,
                                        height: 40,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={{
                                        borderRadius: 40,
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={require('../../Images/Extra/default_user_dp_light.jpg')}
                                />
                            )}
                            <Text
                                style={{
                                    color: Colors().Black,
                                    fontSize: 16,
                                    fontFamily: fonts.OpenSans_500,
                                    marginLeft: 5,
                                }}>
                                {shorten_text({
                                    text: UserDataStore?.user_data
                                        ?.username as string,
                                    limit: 25,
                                })}
                            </Text>
                        </View>
                        <BasicTextEntry
                            inputMode="text"
                            inputValue={reply}
                            setInputValue={setReply}
                            marginTop={12}
                            marginBottom={11}
                            marginHorizontal={1}
                            placeHolderText="Enter your reply here..."
                            autoFocus={true}
                        />
                        <BasicButton
                            buttonText="Send Reply"
                            execFunc={send_reply}
                        />
                    </View>
                )}
            </KeyboardAvoidingView>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    app_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    bottom_sheet: {
        shadowColor: Colors().Black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: Colors().InputBackground,
    },
});

export default BottomOverlay;

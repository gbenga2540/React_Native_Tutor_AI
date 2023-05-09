import React, { FunctionComponent, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { INTF_Comments } from '../../Interface/Comments/Comments';
import { getCustomTimeAgo } from '../../Utils/Time_Converter/Time_Converter';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import { useMutation, useQueryClient } from 'react-query';
import {
    delete_comment,
    edit_comment,
} from '../../Configs/Queries/Blogs/Blogs';
import IconText from '../Icon_Text/Icon_Text';
import { CurrentCommentsStore } from '../../MobX/Current_Comments/Current_Comments';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import { INTF_BlogDetails } from '../../Interface/Blog_Details/Blog_Details';

interface CommentCardProps {
    comment: INTF_Comments;
}
const CommentCard: FunctionComponent<CommentCardProps> = ({ comment }) => {
    const queryClient = useQueryClient();

    const [edit, setEdit] = useState<boolean>(false);
    const [editComment, setEditComment] = useState<string>(
        comment?.comment as string,
    );

    const { mutate: edit_comment_mutate } = useMutation(edit_comment, {
        onMutate: () => {
            CurrentCommentsStore.update_comment({
                cid: comment?._id as string,
                message: editComment,
            });
        },
        onSettled: data => {
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

            if (data?.error) {
                const comment_to_change: INTF_Comments[] =
                    old_data?.data?.comments?.filter(
                        item => item?._id === comment?._id,
                    ) as INTF_Comments[];
                CurrentCommentsStore.update_comment({
                    cid: comment?._id as string,
                    message: comment_to_change[0]?.comment as string,
                });
            } else {
                const old_item: INTF_BlogDetails = old_data?.data;
                const new_item: INTF_BlogDetails = {
                    ...old_item,
                    comments: CurrentCommentsStore?.current_comments,
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

    const { mutate: delete_comment_mutate } = useMutation(delete_comment, {
        onMutate: () => {
            CurrentCommentsStore.delete_comment({
                cid: comment?._id as string,
            });
        },
        onSettled: data => {
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
            if (data?.error) {
                CurrentCommentsStore.set_comments({
                    svr_comments: old_data?.data?.comments as INTF_Comments[],
                });
            } else {
                const old_item: INTF_BlogDetails = old_data?.data;
                const new_item: INTF_BlogDetails = {
                    ...old_item,
                    comments: CurrentCommentsStore?.current_comments,
                    comments_l: CurrentCommentsStore?.current_comments?.length,
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

    const upload__comment = no_double_clicks({
        execFunc: () => {
            setEdit(false);
            edit_comment_mutate({
                blogID: CurrentCommentsStore?.current_blog_id,
                comment: editComment,
                commentID: comment?._id as string,
                user_token: UserInfoStore?.user_info?.token as string,
            });
        },
    });

    const delete__comment = no_double_clicks({
        execFunc: () => {
            setEdit(false);
            delete_comment_mutate({
                blogID: CurrentCommentsStore?.current_blog_id,
                commentID: comment?._id as string,
                user_token: UserInfoStore?.user_info?.token as string,
            });
        },
    });

    const edit__comment = no_double_clicks({
        execFunc: () => {
            setEdit(true);
        },
    });

    const cancel__edit = no_double_clicks({
        execFunc: () => {
            setEdit(false);
        },
    });

    return (
        <View style={styles.comment_main}>
            <View style={styles.c_btn}>
                {comment?.dp_link !== 'none' || !comment?.dp_link ? (
                    <Image
                        style={styles.c_i}
                        source={{
                            uri: comment?.dp_link,
                            width: 40,
                            height: 40,
                        }}
                    />
                ) : (
                    <Image
                        style={styles.c_i}
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
                        text: comment?.username as string,
                        limit: 25,
                    })}
                </Text>
                <Text
                    style={{
                        color: Colors().DarkGrey,
                        fontSize: 15,
                        fontFamily: fonts.Urbanist_500,
                        marginLeft: 7,
                    }}>
                    {getCustomTimeAgo({
                        date_string: comment?.createdAt as string,
                    })}
                </Text>
            </View>
            {!edit && (
                <Text
                    style={{
                        color: Colors().Dark,
                        fontSize: 16,
                        fontFamily: fonts.OpenSans_400,
                        marginTop: 10,
                        marginHorizontal: 3,
                    }}>
                    {comment?.comment}
                </Text>
            )}
            {edit && (
                <TextInput
                    style={{
                        color: Colors().Dark,
                        fontSize: 16,
                        fontFamily: fonts.OpenSans_400,
                        marginTop: 10,
                        marginHorizontal: 3,
                    }}
                    multiline={true}
                    inputMode="text"
                    value={editComment}
                    onChangeText={(text: string) => {
                        setEditComment(text);
                    }}
                    autoFocus
                />
            )}
            {comment?.is_c_owner && !edit && (
                <View
                    style={{
                        marginTop: 12,
                        marginHorizontal: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <IconText
                        buttonName="Delete"
                        buttonColor={Colors().Red}
                        iconName="trash-2"
                        execFunc={delete__comment}
                    />
                    <IconText
                        buttonName="Edit"
                        buttonColor={Colors().Dark}
                        iconName="edit"
                        execFunc={edit__comment}
                    />
                </View>
            )}
            {comment?.is_c_owner && edit && (
                <View
                    style={{
                        marginTop: 12,
                        marginHorizontal: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <IconText
                        buttonName="Cancel"
                        buttonColor={Colors().Red}
                        iconName="x"
                        execFunc={cancel__edit}
                    />
                    <IconText
                        execFunc={upload__comment}
                        buttonName="Upload"
                        buttonColor={Colors().Dark}
                        iconName="send"
                    />
                </View>
            )}
        </View>
    );
};

export default CommentCard;

const styles = StyleSheet.create({
    comment_main: {
        width: '100%',
        marginBottom: 40,
    },
    c_i: {
        borderRadius: 40,
        width: 40,
        height: 40,
    },
    c_btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from 'react-query';
import { update_username } from '../../Configs/Queries/Users/Users';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import { UserDataStore } from '../../MobX/User_Data/User_Data';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import { INTF_UserData } from '../../Interface/User_Data/User_Data';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';

const ChangeUsernamePage: FunctionComponent = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [username, setUsername] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: update_username_mutate } = useMutation(update_username, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            setDisableButton(false);
            setShowSpinner(false);
            if (data?.error) {
                error_handler({
                    navigation: navigation,
                    error_mssg: data?.data,
                });
            } else {
                UserDataStore?.update_user_name({ username: username });

                queryClient.cancelQueries([
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                ]);
                const old_data: {
                    error: boolean;
                    data: INTF_UserData;
                } = queryClient.getQueryData(
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                    // @ts-ignore
                ) as {
                    error: boolean;
                    data: INTF_UserData;
                };
                const old_item: INTF_UserData = old_data?.data;
                const new_item: INTF_UserData = {
                    ...old_item,
                    username: username,
                };
                queryClient?.setQueryData(
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                    {
                        error: false,
                        data: new_item,
                    },
                );
                queryClient.resumePausedMutations();
                setUsername('');
                info_handler({
                    navigation: navigation,
                    proceed_type: 3,
                    hide_back_btn: true,
                    hide_header: false,
                    success_mssg: 'Username changed Successfully!',
                });
            }
        },
    });

    const update_username_func = no_double_clicks({
        execFunc: () => {
            if (username) {
                update_username_mutate({
                    user_token: UserInfoStore.user_info.token as string,
                    username: username,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Username field cannot be empty!',
                });
            }
        },
    });

    return (
        <View style={styles.cp_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: navigation?.canGoBack()
                        ? Platform?.OS === 'ios'
                            ? 56
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 28,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <Text style={styles.cp_m_wt}>Update your Username</Text>
            <Text style={styles.cp_m_wt2}>
                {
                    "Please enter a new Username below and click 'Update Username' to apply the change."
                }
            </Text>
            <BasicTextEntry
                placeHolderText="Enter a new Username..."
                inputValue={username}
                setInputValue={setUsername}
                marginBottom={15}
            />
            <BasicButton
                buttonText="Update Username"
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={update_username_func}
                buttonHeight={56}
                disabled={disableButton}
            />
        </View>
    );
};

export default ChangeUsernamePage;

const styles = StyleSheet.create({
    cp_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    cp_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
    },
    cp_m_wt2: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 22,
        marginRight: 22,
        color: Colors().Grey,
        marginBottom: 22,
        maxWidth: 330,
    },
});

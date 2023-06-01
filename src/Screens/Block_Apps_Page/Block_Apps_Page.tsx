import React, { FunctionComponent, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Configs/Fonts/Fonts';
import HeaderTab from '../../Components/Header_Tab/Header_Tab';
import { AppInfoStore } from '../../MobX/App_Info/App_Info';
import AppInfo from '../../Components/App_Info/App_Info';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';
import OverlaySpinner2 from '../../Components/Overlay_Spinner_2/Overlay_Spinner_2';

const BlockAppsPage: FunctionComponent = () => {
    const [currentTAB, setCurrentTAB] = useState<number>(1);
    const [allApps, setAllApps] = useState<INTF_AppInfo[]>([]);

    useEffect(() => {
        const load_apps_timeout = setTimeout(() => {
            setAllApps(AppInfoStore.app_list);
        }, 300);
        return () => {
            clearTimeout(load_apps_timeout);
        };
    }, []);

    return (
        <View style={styles.bap_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop: Platform.OS === 'ios' ? 65 : 30,
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
                    Parental Control
                </Text>
            </View>
            <View style={{ height: 56, marginHorizontal: 22 }}>
                <HeaderTab
                    marginTop={20}
                    header_1="Apps"
                    header_2="Blocked"
                    show_numbers
                    number_1={
                        allApps?.filter(item => item?.isEnabled === true)
                            ?.length
                    }
                    number_2={
                        allApps?.filter(item => item?.isEnabled === false)
                            ?.length
                    }
                    marginBetween={4}
                    execFunc_Header_1={() => setCurrentTAB(1)}
                    execFunc_Header_2={() => setCurrentTAB(2)}
                />
            </View>
            {allApps.length > 0 && (
                <ScrollView
                    style={{
                        flex: 1,
                        marginHorizontal: 3,
                        paddingHorizontal: 20,
                        marginTop: 3,
                        paddingTop: 25,
                        paddingBottom: Platform.OS === 'ios' ? 25 : 5,
                    }}>
                    {currentTAB === 1 &&
                        allApps
                            .filter(item => item?.isEnabled === true)
                            ?.map((item, index) => (
                                <AppInfo app={item} key={index} />
                            ))}
                    {currentTAB === 2 &&
                        allApps
                            .filter(item => item?.isEnabled === false)
                            ?.map((item, index) => (
                                <AppInfo app={item} key={index} />
                            ))}
                    <View style={{ marginBottom: 40 }}>{''}</View>
                </ScrollView>
            )}
            {allApps.length === 0 && <OverlaySpinner2 showSpinner />}
        </View>
    );
};

export default BlockAppsPage;

const styles = StyleSheet.create({
    bap_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

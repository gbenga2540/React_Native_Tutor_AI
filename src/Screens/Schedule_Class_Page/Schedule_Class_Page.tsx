import React, { FunctionComponent } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import ScheduleItem from '../../Components/Schedule_Item/Schedule_Item';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { Observer } from 'mobx-react';
import Feather from 'react-native-vector-icons/Feather';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

const ScheduleClassPage: FunctionComponent = () => {
    return (
        <View style={styles.sc_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop: 65,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Schedule Class"
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
            </View>
            <Observer>
                {() => (
                    <FlatList
                        data={ScheduleInfoStore?.schedule_info}
                        renderItem={({ item, index }) => (
                            <ScheduleItem
                                key={index}
                                schedule={item}
                                index={index}
                            />
                        )}
                        keyExtractor={(item, index) =>
                            `${item.time} + ${index}`
                        }
                        style={{
                            marginHorizontal: 2,
                            paddingHorizontal: 20,
                            paddingTop: 10,
                            flex: 1,
                        }}
                    />
                )}
            </Observer>
            <TouchableOpacity
                onPress={no_double_clicks({
                    execFunc: () =>
                        BottomSheetStore.open_bottom_sheet({
                            component_type: 2,
                        }),
                })}
                activeOpacity={0.55}
                style={{
                    backgroundColor: Colors.Primary,
                    alignSelf: 'flex-end',
                    marginRight: 22,
                    marginBottom: Platform.OS === 'ios' ? 30 : 10,
                    marginTop: 8,
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Feather name="plus" size={30} color={Colors.White} />
            </TouchableOpacity>
        </View>
    );
};

export default ScheduleClassPage;

const styles = StyleSheet.create({
    sc_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});

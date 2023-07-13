import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { INTF_LessonTopics } from '../../Interface/Lesson/Lesson';
import ArcInnerIcon from '../../Images/SVGs/Arc_Inner_Icon.svg';
import ArcOuterIcon from '../../Images/SVGs/Arc_Outer_Icon.svg';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicText from '../Basic_Text/Basic_Text';
import { observer } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import { activate_lesson } from '../../Configs/Queries/Lesson/Lesson';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { INTF_UserInfo } from '../../Interface/User_Info/User_Info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';

interface LessonCardProps {
    lesson: INTF_LessonTopics;
    current_index: number;
    last_index: number;
    disabled?: boolean;
    is_available?: boolean;
    setShowSpinner?: Dispatch<SetStateAction<boolean>>;
    isArchives?: boolean;
}
const LessonCard: FunctionComponent<LessonCardProps> = observer(
    ({
        lesson,
        current_index,
        last_index,
        disabled,
        is_available,
        setShowSpinner,
        isArchives,
    }) => {
        const navigation = useNavigation<NativeStackNavigationProp<any>>();
        const UserLessonScore = UserInfoStore?.user_info?.lessons || [];
        const [showSub, setShowSub] = useState<boolean>(false);

        const show_lesson = is_available || false;

        const { mutate: activate_lesson_mutate } = useMutation(
            activate_lesson,
            {
                onMutate: () => {
                    setShowSpinner !== undefined && setShowSpinner(true);
                },
                onSettled: async data => {
                    setShowSpinner !== undefined && setShowSpinner(false);
                    if (data?.error) {
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'Something went wrong!\n\n' + data?.data,
                            svr_error_mssg: data?.data,
                        });
                    } else {
                        const newData = data?.data;
                        const oldLessons =
                            UserInfoStore?.user_info?.lessons !== undefined
                                ? [...UserInfoStore?.user_info?.lessons]
                                : [];

                        if (oldLessons?.length > 0) {
                            const exist = oldLessons?.findIndex(
                                obj => obj?.id === newData?.id,
                            );
                            if (exist !== -1) {
                                oldLessons[exist] = newData;
                            } else {
                                oldLessons?.push(newData);
                            }
                        } else {
                            oldLessons?.push(newData);
                        }

                        const newUserInfo: INTF_UserInfo = {
                            ...UserInfoStore?.user_info,
                            lessons: oldLessons,
                        };

                        const proceed = () => {
                            UserInfoStore?.set_user_info({
                                user_info: newUserInfo,
                            });
                            setShowSub(true);
                        };

                        try {
                            await SInfo.setItem(
                                SECURE_STORAGE_USER_INFO,
                                JSON.stringify({
                                    user_info: newUserInfo,
                                }),
                                {
                                    sharedPreferencesName: SECURE_STORAGE_NAME,
                                    keychainService: SECURE_STORAGE_NAME,
                                },
                            )
                                .catch(err => {
                                    err && proceed();
                                })
                                .then(() => {
                                    proceed();
                                });
                        } catch (error) {
                            proceed();
                        }
                    }
                },
            },
        );

        const nav_to_lesson = ({ index }: { index: number }) => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'LessonConvPage',
                    params: {
                        topic: lesson?.lesson_topic,
                        sub_topic: lesson.lesson_sub_topic[index],
                    },
                } as never,
            );
        };

        const open_lesson = no_double_clicks({
            execFunc: () => {
                if (showSub) {
                    setShowSub(false);
                } else {
                    if (is_available) {
                        // nav_to_lesson();
                        setShowSub(true);
                    } else {
                        if (
                            lesson?.lesson_id === 101 ||
                            lesson?.lesson_id === 201 ||
                            lesson?.lesson_id === 301 ||
                            lesson?.lesson_id === 401 ||
                            lesson?.lesson_id === 501
                        ) {
                            // nav_to_lesson();
                            setShowSub(true);
                        } else {
                            if (
                                UserLessonScore?.filter(
                                    item => item?.id === lesson?.lesson_id - 1,
                                )?.length > 0
                            ) {
                                activate_lesson_mutate({
                                    userId: UserInfoStore?.user_info
                                        ?._id as string,
                                    lessonId: lesson?.lesson_id as number,
                                });
                            } else {
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        'You need to activate other lessons above to unlock this lesson.',
                                });
                            }
                        }
                    }
                }
            },
        });

        return (
            <View
                style={{
                    marginBottom:
                        current_index === last_index
                            ? Platform.OS === 'ios'
                                ? 67
                                : 22
                            : 17,
                }}>
                <TouchableOpacity
                    onPress={open_lesson}
                    disabled={disabled || false}
                    activeOpacity={0.5}
                    style={[
                        styles.lesson_main,
                        {
                            backgroundColor: show_lesson
                                ? Colors.Primary
                                : Colors.LightPurple3,
                        },
                    ]}>
                    <ArcInnerIcon
                        style={{ position: 'absolute', right: 0 }}
                        color={
                            show_lesson ? Colors.ArcInner_A : Colors.ArcInner_I
                        }
                    />
                    <ArcOuterIcon
                        style={{ position: 'absolute', right: 0 }}
                        color={
                            show_lesson ? Colors.ArcOuter_A : Colors.ArcOuter_I
                        }
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
                                borderColor: show_lesson
                                    ? Colors.ArcInner_A
                                    : Colors.ArcInner_I,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require('../../Images/Logos/Tutor_AI_Logo.png')}
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
                            <BasicText
                                inputText={`Subject ${lesson?.lesson_index} ${
                                    isArchives
                                        ? lesson?.lesson_id?.toString()?.[0] ===
                                          '1'
                                            ? ' - Beginner'
                                            : lesson?.lesson_id?.toString()?.[0] ===
                                              '2'
                                            ? ' - Pre-Intermediate'
                                            : lesson?.lesson_id?.toString()?.[0] ===
                                              '3'
                                            ? ' - Intermediate'
                                            : lesson?.lesson_id?.toString()?.[0] ===
                                              '4'
                                            ? ' - Upper-Intermediate'
                                            : ' - Confident'
                                        : ''
                                }`}
                                textWeight={500}
                                textSize={15}
                                textColor={
                                    show_lesson ? Colors.White : Colors.Black
                                }
                            />
                            <BasicText
                                inputText={lesson?.lesson_topic as string}
                                textWeight={600}
                                textSize={18}
                                textColor={
                                    show_lesson ? Colors.White : Colors.Black
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {showSub && (
                    <>
                        {lesson.lesson_sub_topic.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.55}
                                onPress={() => nav_to_lesson({ index: index })}
                                style={{
                                    marginBottom: 1,
                                    marginTop: 8,
                                    backgroundColor: Colors.LightGrey,
                                    borderRadius: 10,
                                    paddingHorizontal: 12,
                                    paddingVertical: 11,
                                }}
                                key={index}>
                                <BasicText
                                    inputText={`Lesson ${index + 1}`}
                                    textWeight={700}
                                    textSize={17}
                                />
                                <BasicText inputText={item} textSize={15} />
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
        );
    },
);

export default LessonCard;

const styles = StyleSheet.create({
    lesson_main: {
        minHeight: 120,
        borderRadius: 15,
    },
});

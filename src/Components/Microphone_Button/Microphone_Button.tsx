import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import {
    Keyboard,
    StyleSheet,
    Pressable,
    View,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Voice from '@react-native-voice/voice';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';

const mic_size = 80;
const anim_speed = 200;

interface MicrophoneButtonProps {
    microphoneSize?: number;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginHorizontal?: number | 'auto';
    disabled?: boolean;
    animationSpeed?: number;
    setMicText: Dispatch<SetStateAction<string>>;
    isRecording: boolean;
    setIsRecording: Dispatch<SetStateAction<boolean>>;
    onMicSend?: DebouncedFuncLeading<() => void>;
}

const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
const MicrophoneButton: FunctionComponent<MicrophoneButtonProps> = ({
    microphoneSize,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    disabled,
    animationSpeed,
    setMicText,
    isRecording,
    setIsRecording,
    onMicSend,
}) => {
    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);

    const opacityValue = useSharedValue(0);
    const micSize = useSharedValue(0);
    const micColor = useSharedValue(0);

    const cbOpacity = useSharedValue(0);
    const cbPosition = useSharedValue(0);

    Voice.onSpeechResults = result => {
        setMicText(result.value?.[0] || '');
    };

    Voice.onSpeechError = _error => {};

    const start_recording = async () => {
        try {
            await Voice.start('en-US');
        } catch (error) {}
    };
    const stop_recording = async () => {
        try {
            await Voice.stop();
            setIsOptionsShown(true);
            open_options();
        } catch (error) {}
    };

    const pressableStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
            width: micSize.value,
            height: micSize.value,
        };
    });

    const micStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            micColor.value,
            [0, 1],
            [Colors.Primary, Colors.White],
        );
        return {
            color: color,
        };
    });

    const cbStyle = useAnimatedStyle(() => {
        return {
            opacity: cbOpacity.value,
            top: cbPosition.value,
        };
    });

    const handlePress = () => {
        if (isRecording) {
            stop_recording();
            opacityValue.value = withTiming(0, {
                duration: animationSpeed || anim_speed,
            });
            micColor.value = withTiming(0, {
                duration: animationSpeed || anim_speed,
            });
            micSize.value = withTiming(0, {
                duration: animationSpeed || anim_speed,
            });
        } else {
            TextToSpeechStore.clear_speech();
            opacityValue.value = withTiming(1, {
                duration: animationSpeed || anim_speed,
            });
            micColor.value = withTiming(1, {
                duration: animationSpeed || anim_speed,
            });
            if (microphoneSize) {
                micSize.value = withTiming(microphoneSize, {
                    duration: animationSpeed || anim_speed,
                });
            } else {
                micSize.value = withTiming(mic_size, {
                    duration: animationSpeed || anim_speed,
                });
            }
            start_recording();
            setIsRecording(true);
        }
    };

    const open_options = () => {
        cbOpacity.value = withTiming(1, {
            duration: animationSpeed || anim_speed,
        });
        cbPosition.value = withTiming(
            -1 * (microphoneSize || mic_size) -
                (microphoneSize || mic_size) / 8,
            {
                duration: animationSpeed || anim_speed,
            },
        );
    };

    const close_options = () => {
        cbOpacity.value = withTiming(0, {
            duration: animationSpeed || anim_speed,
        });
        cbPosition.value = withTiming(0, {
            duration: animationSpeed || anim_speed,
        });
        setMicText('');
        setIsOptionsShown(false);
        setIsRecording(false);
    };

    const exec_mic_send = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            onMicSend !== undefined && onMicSend();
            close_options();
        },
    });

    return (
        <View
            style={{
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
                marginLeft: marginLeft || 0,
                marginRight: marginRight || 0,
                marginHorizontal: marginHorizontal || 0,
            }}>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        backgroundColor: 'red',
                        width: microphoneSize || mic_size,
                        height: microphoneSize || mic_size,
                        borderRadius: microphoneSize || mic_size,
                        zIndex: isOptionsShown ? 4 : 2,
                        opacity: 0,
                    },
                    cbStyle,
                ]}>
                <Pressable
                    style={{
                        width: microphoneSize || mic_size,
                        height: microphoneSize || mic_size,
                        borderRadius: microphoneSize || mic_size,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => close_options()}>
                    <Feather name="x" size={30} color={Colors.White} />
                </Pressable>
            </Animated.View>
            {isOptionsShown ? (
                <TouchableOpacity
                    activeOpacity={0.55}
                    onPress={exec_mic_send}
                    style={{
                        width: microphoneSize || mic_size,
                        height: microphoneSize || mic_size,
                        borderRadius: microphoneSize || mic_size,
                        zIndex: 3,
                        backgroundColor: Colors.LightPurple,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Feather
                        name="send"
                        size={28}
                        color={Colors.Primary}
                        style={{ marginRight: 2 }}
                    />
                </TouchableOpacity>
            ) : (
                <Pressable
                    onPress={handlePress}
                    disabled={disabled || false}
                    style={[
                        styles.pressable,
                        {
                            width: microphoneSize || mic_size,
                            height: microphoneSize || mic_size,
                            borderRadius: microphoneSize || mic_size,
                            zIndex: 3,
                        },
                    ]}>
                    <Animated.View
                        style={[
                            styles.background,
                            {
                                borderRadius: microphoneSize || mic_size,
                            },
                            pressableStyle,
                        ]}
                    />
                    <AnimatedFeatherIcon
                        name="mic"
                        size={
                            microphoneSize
                                ? Math.round(microphoneSize / 2.67)
                                : 30
                        }
                        style={[{ position: 'absolute' }, micStyle]}
                    />
                </Pressable>
            )}
        </View>
    );
};

export default MicrophoneButton;

const styles = StyleSheet.create({
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.LightPrimary,
    },
    background: {
        backgroundColor: Colors.Primary,
        position: 'absolute',
    },
});

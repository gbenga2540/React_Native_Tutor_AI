import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import {
    Keyboard,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    TextInput,
    InputModeOptions,
    View,
    Platform,
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
import { fonts } from '../../Configs/Fonts/Fonts';

const anim_speed = 200;

interface MicAndTextInputProps {
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    paddingTop?: number | string;
    paddingBottom?: number | string;
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginHorizontal?: number | 'auto';
    disabled?: boolean;
    animationSpeed?: number;
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    inputMode?: InputModeOptions;
    onMicPress?: DebouncedFuncLeading<() => void>;
    onFocus?: DebouncedFuncLeading<() => void>;
    onChange?: DebouncedFuncLeading<() => void>;
    onSend?: DebouncedFuncLeading<() => void>;
    autoFocus?: boolean;
    editable?: boolean;
    textColor?: string;
}

const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
const MicAndTextInput: FunctionComponent<MicAndTextInputProps> = ({
    marginTop,
    marginBottom,
    paddingTop,
    paddingBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    disabled,
    animationSpeed,
    inputValue,
    placeHolderText,
    setInputValue,
    inputMode,
    onMicPress,
    onFocus,
    onChange,
    onSend,
    autoFocus,
    editable,
    textColor,
}) => {
    const opacityValue = useSharedValue(0);
    const micSize = useSharedValue(0);
    const micColor = useSharedValue(0);

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

    const handlePressIn = () => {
        opacityValue.value = withTiming(1, {
            duration: animationSpeed || anim_speed,
        });
        micColor.value = withTiming(1, {
            duration: animationSpeed || anim_speed,
        });
        micSize.value = withTiming(56, {
            duration: animationSpeed || anim_speed,
        });
    };

    const handlePressOut = () => {
        opacityValue.value = withTiming(0, {
            duration: animationSpeed || anim_speed,
        });
        micColor.value = withTiming(0, {
            duration: animationSpeed || anim_speed,
        });
        micSize.value = withTiming(0, {
            duration: animationSpeed || anim_speed,
        });
    };

    const exec_func = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            if (onMicPress !== undefined) {
                onMicPress();
            }
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                    marginHorizontal: marginHorizontal || 0,
                    backgroundColor: Colors.Background,
                    paddingTop: paddingTop || 0,
                    paddingBottom: paddingBottom || 0,
                }}>
                <View
                    style={{
                        // alignItems: 'center',
                        flexDirection: 'row',
                        height: 56,
                        borderRadius: 8,
                        borderColor: Colors.Border,
                        borderWidth: 1,
                        backgroundColor: Colors.InputBackground,
                        flex: 1,
                        marginRight: 10,
                    }}>
                    <TextInput
                        style={[
                            styles.s_t_e_m_ti,
                            { color: textColor || Colors.Dark },
                        ]}
                        placeholder={placeHolderText || ''}
                        placeholderTextColor={Colors.Grey}
                        onChangeText={(text: string) => {
                            setInputValue(text);
                            onChange !== undefined && (onChange() as unknown);
                        }}
                        value={inputValue}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        inputMode={inputMode || 'text'}
                        onFocus={() =>
                            onFocus !== undefined && (onFocus() as unknown)
                        }
                        autoFocus={autoFocus || false}
                        editable={editable === false ? false : true}
                        multiline
                    />
                </View>
                {!inputValue && (
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={exec_func}
                        disabled={disabled || false}
                        style={[
                            styles.pressable,
                            {
                                width: 56,
                                height: 56,
                                borderRadius: 56,
                            },
                        ]}>
                        <Animated.View
                            style={[
                                styles.background,
                                {
                                    borderRadius: 56,
                                },
                                pressableStyle,
                            ]}
                        />
                        <AnimatedFeatherIcon
                            name="mic"
                            size={Math.round(56 / 2.67)}
                            style={[{ position: 'absolute' }, micStyle]}
                        />
                    </Pressable>
                )}
                {inputValue && (
                    <TouchableOpacity
                        onPress={() => onSend !== undefined && onSend()}
                        activeOpacity={0.55}
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 56,
                            backgroundColor: Colors.Primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Feather name="send" size={24} color={Colors.White} />
                    </TouchableOpacity>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default MicAndTextInput;

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
    s_t_e_m_ti: {
        flex: 1,
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        marginHorizontal: 18,
        borderWidth: 0,
        marginVertical: 2,
    },
});

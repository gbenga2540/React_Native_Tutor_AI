import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, Pressable } from 'react-native';
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

const mic_size = 80;
const anim_speed = 200;

interface MicrophoneButtonProps {
    microphoneSize?: number;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginHorizontal?: number | 'auto';
    onMicPress?: DebouncedFuncLeading<() => void>;
    disabled?: boolean;
    animationSpeed?: number;
}

const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
const MicrophoneButton: FunctionComponent<MicrophoneButtonProps> = ({
    microphoneSize,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    onMicPress,
    disabled,
    animationSpeed,
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
        if (microphoneSize) {
            micSize.value = withTiming(microphoneSize, {
                duration: animationSpeed || anim_speed,
            });
        } else {
            micSize.value = withTiming(mic_size, {
                duration: animationSpeed || anim_speed,
            });
        }
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
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={exec_func}
            disabled={disabled || false}
            style={[
                styles.pressable,
                {
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                    marginHorizontal: marginHorizontal || 0,
                    width: microphoneSize || mic_size,
                    height: microphoneSize || mic_size,
                    borderRadius: microphoneSize || mic_size,
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
                size={microphoneSize ? Math.round(microphoneSize / 2.67) : 30}
                style={[{ position: 'absolute' }, micStyle]}
            />
        </Pressable>
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

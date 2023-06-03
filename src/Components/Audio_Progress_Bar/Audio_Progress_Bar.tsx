import React, { FunctionComponent, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Colors from '../../Configs/Colors/Colors';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';

interface AudioProgressBarProps {
    progress: number;
    speed?: number;
    marginHorizontal?: number | 'auto';
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    height?: number;
    borderRadius?: number;
    progressWidth?: number;
}
const AudioProgressBar: FunctionComponent<AudioProgressBarProps> = ({
    progress,
    speed,
    marginHorizontal,
    marginTop,
    marginBottom,
    height,
    borderRadius,
    progressWidth,
}) => {
    const progressAnimation = useSharedValue(0);

    const progressBarStyle = useAnimatedStyle(() => {
        return {
            width: `${progressAnimation.value}%`,
        };
    }, []);

    const progressDotStyle = useAnimatedStyle(() => {
        if (progressWidth) {
            return {
                transform: [
                    {
                        translateX:
                            progressAnimation.value *
                            ((progressWidth - 10) / 100),
                    },
                ],
            };
        } else {
            return {
                transform: [
                    {
                        translateX: progressAnimation.value * 2.4,
                    },
                ],
            };
        }
    }, []);

    useEffect(() => {
        progressAnimation.value = withTiming(clamp_value({ value: progress }), {
            duration: speed || 500,
        });
    }, [progressAnimation, progress, speed]);

    return (
        <View
            style={[
                styles.AudioprogressBar,
                {
                    marginHorizontal: marginHorizontal || 20,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    height: height || 10,
                    maxHeight: height || 10,
                    borderRadius: borderRadius || 4,
                    width: progressWidth || 250,
                },
            ]}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    styles.progress,
                    {
                        height: height || 10,
                        borderRadius: borderRadius || 4,
                    },
                    progressBarStyle,
                ]}
            />
            <Animated.View
                style={[
                    {
                        height: height ? height * 2 : 20,
                        width: height ? height * 2 : 20,
                        borderRadius: height ? height * 2 : 20,
                        backgroundColor: Colors.Primary,
                        borderWidth: 1.4,
                        borderColor: Colors.Grey,
                        position: 'absolute',
                        zIndex: 2,
                        transform: [{ translateX: 240 }],
                    },
                    progressDotStyle,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    AudioprogressBar: {
        flex: 1,
        backgroundColor: Colors.ProgressBackground,
        justifyContent: 'center',
    },
    progress: {
        backgroundColor: Colors.Primary,
    },
});

export default AudioProgressBar;

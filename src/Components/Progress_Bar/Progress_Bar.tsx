import React, { FunctionComponent, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Colors from '../../Configs/Colors/Colors';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';

interface ProgressBarProps {
    progress: number;
    speed?: number;
    marginHorizontal?: number | 'auto';
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    height?: number;
    borderRadius?: number;
    backgroundColor?: string;
    progressBackgroundColor?: string;
}
const ProgressBar: FunctionComponent<ProgressBarProps> = ({
    progress,
    speed,
    marginHorizontal,
    marginTop,
    marginBottom,
    height,
    borderRadius,
    backgroundColor,
    progressBackgroundColor,
}) => {
    const progressAnimation = useSharedValue(0);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progressAnimation.value}%`,
        };
    }, []);

    useEffect(() => {
        progressAnimation.value = withTiming(clamp_value({ value: progress }), {
            duration: speed || 500,
        });
    }, [progressAnimation, progress, speed]);

    return (
        <View
            style={[
                styles.progressBar,
                {
                    marginHorizontal: marginHorizontal || 20,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    height: height || 10,
                    maxHeight: height || 10,
                    borderRadius: borderRadius || 4,
                    backgroundColor:
                        backgroundColor || Colors.ProgressBackground,
                },
            ]}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        height: height || 10,
                        borderRadius: borderRadius || 4,
                        backgroundColor:
                            progressBackgroundColor || Colors.Primary,
                    },
                    reanimatedStyle,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
    },
});

export default ProgressBar;

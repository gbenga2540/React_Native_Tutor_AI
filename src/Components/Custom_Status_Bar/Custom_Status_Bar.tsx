import React, { FunctionComponent } from 'react';
import { StatusBar } from 'react-native';
import Colors from '../../Configs/Colors/Colors';

interface CustomStatusBarProps {
    showSpinner?: boolean;
    backgroundColor?: string;
    backgroundDimColor?: string;
    lightContent?: boolean;
}

const CustomStatusBar: FunctionComponent<CustomStatusBarProps> = ({
    showSpinner,
    backgroundColor,
    backgroundDimColor,
    lightContent,
}) => {
    return (
        <StatusBar
            barStyle={lightContent || false ? 'light-content' : 'dark-content'}
            backgroundColor={
                showSpinner || false
                    ? backgroundDimColor
                        ? backgroundDimColor
                        : Colors.BackgroundDim
                    : backgroundColor
                    ? backgroundColor
                    : Colors.Background
            }
        />
    );
};

export default CustomStatusBar;

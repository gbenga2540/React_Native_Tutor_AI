import { Dimensions } from 'react-native';

export const screen_width_less_than = ({
    min_width,
    if_true,
    if_false,
}: {
    min_width?: number;
    if_true: any;
    if_false: any;
}): any => {
    const { width: screenWidth } = Dimensions.get('window');
    if (screenWidth <= (min_width || 395)) {
        return if_true;
    } else {
        return if_false;
    }
};

export const screen_height_less_than = ({
    min_height,
    if_true,
    if_false,
}: {
    min_height?: number;
    if_true: any;
    if_false: any;
}): any => {
    const { height: screenHeight } = Dimensions.get('window');
    if (screenHeight <= (min_height || 760)) {
        return if_true;
    } else {
        return if_false;
    }
};

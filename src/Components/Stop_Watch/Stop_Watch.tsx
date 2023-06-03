import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { View } from 'react-native';

interface StopWatchProps {
    timer: number;
    setTimer: Dispatch<SetStateAction<number>>;
    onCompleted?: () => void;
}
const StopWatch: FunctionComponent<StopWatchProps> = ({
    timer,
    setTimer,
    onCompleted,
}) => {
    const count_down = () => {
        const interval = setInterval(() => {
            setTimer(timer - 1 <= 0 ? 0 : timer - 1);
        }, 1000);

        if (timer <= 0) {
            onCompleted !== undefined && onCompleted();
            clearInterval(interval);
        }
    };
    count_down();
    console.log(timer);

    return <View>{''}</View>;
};

export default StopWatch;

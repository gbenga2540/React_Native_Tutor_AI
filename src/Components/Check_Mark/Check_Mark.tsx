import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Configs/Colors/Colors';
import { number_to_day_short } from '../../Utils/Number_To_Day_Short/Number_To_Day_Short';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicText from '../Basic_Text/Basic_Text';

interface CheckMarkProps {
    day_num: number;
    isCompleted?: boolean;
}
const CheckMark: FunctionComponent<CheckMarkProps> = ({
    day_num,
    isCompleted,
}) => {
    return (
        <View
            style={{
                marginHorizontal: 5,
            }}>
            <View
                style={
                    isCompleted
                        ? {
                              width: 22,
                              height: 22,
                              backgroundColor: Colors.Primary,
                              borderRadius: 22,
                              alignItems: 'center',
                              justifyContent: 'center',
                          }
                        : {
                              borderWidth: 1,
                              borderColor: Colors.White,
                              width: 22,
                              height: 22,
                              borderRadius: 22,
                          }
                }>
                {isCompleted && (
                    <Feather name="check" size={15} color={Colors.White} />
                )}
            </View>
            <BasicText
                inputText={number_to_day_short({
                    day_number: day_num || 1,
                })}
                marginTop={4}
                textSize={10}
                textFamily={fonts.OpenSans_400}
                textAlign="center"
                textColor={Colors.White}
            />
        </View>
    );
};

export default CheckMark;

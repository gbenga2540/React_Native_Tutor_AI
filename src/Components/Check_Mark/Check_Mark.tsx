import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Configs/Colors/Colors';
import { number_to_day_short } from '../../Utils/Number_To_Day_Short/Number_To_Day_Short';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicText from '../Basic_Text/Basic_Text';
import { screen_width_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

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
                              width: screen_width_less_than({
                                  if_true: 18,
                                  if_false: 22,
                              }),
                              height: screen_width_less_than({
                                  if_true: 18,
                                  if_false: 22,
                              }),
                              backgroundColor: Colors.Primary,
                              borderRadius: screen_width_less_than({
                                  if_true: 18,
                                  if_false: 22,
                              }),
                              alignItems: 'center',
                              justifyContent: 'center',
                          }
                        : {
                              borderWidth: 1,
                              borderColor: Colors.White,
                              width: screen_width_less_than({
                                  if_true: 18,
                                  if_false: 22,
                              }),
                              height: screen_width_less_than({
                                  if_true: 18,
                                  if_false: 22,
                              }),
                              borderRadius: screen_width_less_than({
                                  if_true: 18,
                                  if_false: 22,
                              }),
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

import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { INTF_Subscription } from '../../Interface/Subscription/Subscription';

interface SubscriptionPlanProps {
        subscription: INTF_Subscription;
        index: number;
        activeSubPlan: number;
        setActiveSubPlan: Dispatch<SetStateAction<number>>;
}
const SubscriptionPlan: FunctionComponent<SubscriptionPlanProps> = ({ subscription, index, activeSubPlan, setActiveSubPlan }) => {
        const [isActive, setIsActive] = useState<boolean>(false);

        useEffect(() => {
                if (index === activeSubPlan) {
                        setIsActive(true);
                } else {
                        setIsActive(false);
                }
        }, [index, activeSubPlan]);

        return (
                <TouchableOpacity
                        onPress={no_double_clicks({
                                execFunc: () => {
                                        setActiveSubPlan(index);
                                },
                        })}
                        activeOpacity={0.55}
                        style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                padding: 20,
                                borderColor: isActive ? Colors.Primary : Colors.DarkBorder,
                                borderRadius: 15,
                                marginBottom: 20,
                                backgroundColor: isActive ? Colors.LightPrimary : Colors.White,
                        }}>
                        <View
                                style={{
                                        marginRight: 'auto',
                                }}>
                                <Text
                                        style={{
                                                fontFamily: fonts.Urbanist_700,
                                                color: Colors.Dark,
                                                fontSize: 19,
                                        }}>
                                        {`${subscription.months} ${subscription.months === 1 ? 'Month' : 'Months'}`}
                                </Text>
                                <Text
                                        style={{
                                                fontFamily: fonts.Urbanist_500,
                                                color: Colors.DarkGrey,
                                                fontSize: 14,
                                        }}>
                                        {`${subscription.discount}% off`}
                                </Text>
                        </View>
                        <Text
                                style={{
                                        fontFamily: fonts.Urbanist_700,
                                        color: Colors.Primary,
                                        fontSize: 19,
                                }}>
                                {`$${subscription.price}.00`}
                        </Text>
                </TouchableOpacity>
        );
};

export default SubscriptionPlan;

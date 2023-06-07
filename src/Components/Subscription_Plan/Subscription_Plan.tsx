import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { INTF_Subscription } from '../../Interface/Subscription/Subscription';
import BasicText from '../Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

interface SubscriptionPlanProps {
    subscription: INTF_Subscription;
    index: number;
    activeSubPlan: number;
    setActiveSubPlan: Dispatch<SetStateAction<number>>;
}
const SubscriptionPlan: FunctionComponent<SubscriptionPlanProps> = ({
    subscription,
    index,
    activeSubPlan,
    setActiveSubPlan,
}) => {
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
                paddingVertical: screen_height_less_than({
                    if_true: 15,
                    if_false: 20,
                }),
                borderColor: isActive ? Colors.Primary : Colors.DarkBorder,
                borderRadius: 15,
                marginBottom: 20,
                backgroundColor: isActive ? Colors.LightPrimary : Colors.White,
            }}>
            <View
                style={{
                    marginRight: 'auto',
                }}>
                <BasicText
                    inputText={`${subscription.months} ${
                        subscription.months === 1 ? 'Month' : 'Months'
                    }`}
                    textWeight={700}
                    textSize={19}
                />
                <BasicText
                    inputText={`${subscription.discount}% off`}
                    textWeight={500}
                    textSize={14}
                    textColor={Colors.DarkGrey}
                />
            </View>
            <BasicText
                inputText={`$${subscription.price}.00`}
                textWeight={700}
                textSize={19}
                textColor={Colors.Primary}
            />
        </TouchableOpacity>
    );
};

export default SubscriptionPlan;

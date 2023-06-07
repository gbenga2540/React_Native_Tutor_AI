import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { INTF_PaymentMethods } from '../../Interface/Payment_Methods/Payment_Methods';
import BasicText from '../Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

interface PaymentMethodProps {
    payment_method: INTF_PaymentMethods;
    index: number;
    activePM: number;
    setActivePM: Dispatch<SetStateAction<number>>;
}
const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
    payment_method,
    index,
    activePM,
    setActivePM,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (index === activePM) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [index, activePM]);

    return (
        <TouchableOpacity
            onPress={no_double_clicks({
                execFunc: () => {
                    setActivePM(index);
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
                minHeight: screen_height_less_than({
                    if_true: 70,
                    if_false: 90,
                }),
            }}>
            <Image
                source={payment_method.logo}
                style={{
                    width: 30,
                    height: 30,
                    marginRight: 11,
                }}
            />
            <BasicText
                inputText={payment_method.name}
                textSize={18}
                textWeight={700}
            />
            <View
                style={{
                    marginLeft: 'auto',
                    borderWidth: 2,
                    borderColor: Colors.Primary,
                    borderRadius: 20,
                    padding: 2,
                }}>
                <View
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 12,
                        padding: 3,
                        backgroundColor: isActive
                            ? Colors.Primary
                            : Colors.White,
                    }}>
                    {''}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PaymentMethod;

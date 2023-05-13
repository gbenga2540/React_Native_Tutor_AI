import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

interface DropDownProps {
    borderColor?: string;
    backgroundColor?: string;
    showLabel?: boolean;
    labelTitle?: string;
    dropdownData: { label: string; value: string }[];
    focusPlaceHolder?: string;
    unFocusPlaceHolder?: string;
    value: any;
    setValue: Dispatch<SetStateAction<any>>;
    height?: number;
    marginTop?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginBottom?: number | string;
    marginHorizontal?: number;
    paddingHorizontal?: number;
    disable?: boolean;
}

const RNDropDown: FunctionComponent<DropDownProps> = ({
    borderColor,
    backgroundColor,
    showLabel,
    labelTitle,
    dropdownData,
    focusPlaceHolder,
    unFocusPlaceHolder,
    value,
    setValue,
    height,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    paddingHorizontal,
    disable,
}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text
                    style={[
                        styles.label,
                        {
                            backgroundColor:
                                backgroundColor || Colors.Background,
                        },
                        isFocus && { color: borderColor || Colors.Primary },
                    ]}>
                    {labelTitle || 'Select'}
                </Text>
            );
        }
        return null;
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: backgroundColor || Colors.Background,
                    height: height || 50,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginHorizontal: marginHorizontal || 0,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                },
            ]}>
            {(showLabel || false) && renderLabel()}
            <Dropdown
                disable={disable || false}
                style={[
                    styles.dropdown,
                    {
                        height: height || 50,
                        paddingLeft: paddingHorizontal || 12,
                        paddingRight: paddingHorizontal || 12,
                    },
                    isFocus && { borderColor: borderColor || Colors.Primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                    !isFocus
                        ? unFocusPlaceHolder || 'Select Option'
                        : focusPlaceHolder || '...'
                }
                searchPlaceholder="Search..."
                value={value || dropdownData[0]?.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value as any);
                    setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //     <AntDesign
                //         style={styles.icon}
                //         color={
                //             isFocus ? borderColor || Colors.Primary : 'black'
                //         }
                //         name="Safety"
                //         size={20}
                //     />
                // )}
                renderLeftIcon={() => null}
            />
        </View>
    );
};

export default RNDropDown;

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingBottom: 0,
    },
    dropdown: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingLeft: 16,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: fonts.Urbanist_500,
        color: Colors.DarkGrey,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: fonts.Urbanist_500,
        color: Colors.DarkGrey,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemTextStyle: {
        fontFamily: fonts.Urbanist_500,
        color: Colors.DarkGrey,
    },
});

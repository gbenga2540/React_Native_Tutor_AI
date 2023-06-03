import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

interface PhoneNumberInputProps {
    defaultCode?:
        | 'AF'
        | 'AL'
        | 'DZ'
        | 'AS'
        | 'AD'
        | 'AO'
        | 'AI'
        | 'AQ'
        | 'AG'
        | 'AR'
        | 'AM'
        | 'AW'
        | 'AU'
        | 'AT'
        | 'AZ'
        | 'BS'
        | 'BH'
        | 'BD'
        | 'BB'
        | 'BY'
        | 'BE'
        | 'BZ'
        | 'BJ'
        | 'BM'
        | 'BT'
        | 'BO'
        | 'BA'
        | 'BW'
        | 'BV'
        | 'BR'
        | 'IO'
        | 'VG'
        | 'BN'
        | 'BG'
        | 'BF'
        | 'BI'
        | 'KH'
        | 'CM'
        | 'CA'
        | 'CV'
        | 'BQ'
        | 'KY'
        | 'CF'
        | 'TD'
        | 'CL'
        | 'CN'
        | 'CX'
        | 'CC'
        | 'CO'
        | 'KM'
        | 'CK'
        | 'CR'
        | 'HR'
        | 'CU'
        | 'CW'
        | 'CY'
        | 'CZ'
        | 'CD'
        | 'DK'
        | 'DJ'
        | 'DM'
        | 'DO'
        | 'EC'
        | 'EG'
        | 'SV'
        | 'GQ'
        | 'ER'
        | 'EE'
        | 'SZ'
        | 'ET'
        | 'FK'
        | 'FO'
        | 'FJ'
        | 'FI'
        | 'FR'
        | 'GF'
        | 'PF'
        | 'TF'
        | 'GA'
        | 'GM'
        | 'GE'
        | 'DE'
        | 'GH'
        | 'GI'
        | 'GR'
        | 'GL'
        | 'GD'
        | 'GP'
        | 'GU'
        | 'GT'
        | 'GG'
        | 'GN'
        | 'GW'
        | 'GY'
        | 'HT'
        | 'HM'
        | 'HN'
        | 'HU'
        | 'IS'
        | 'IN'
        | 'ID'
        | 'IR'
        | 'IQ'
        | 'IE'
        | 'IM'
        | 'IL'
        | 'IT'
        | 'CI'
        | 'JM'
        | 'JP'
        | 'JE'
        | 'JO'
        | 'KZ'
        | 'KE'
        | 'XK'
        | 'KW'
        | 'KG'
        | 'LA'
        | 'LV'
        | 'LB'
        | 'LS'
        | 'LR'
        | 'LY'
        | 'LI'
        | 'LT'
        | 'LU'
        | 'MO'
        | 'MK'
        | 'MG'
        | 'MW'
        | 'MY'
        | 'MV'
        | 'ML'
        | 'MT'
        | 'MH'
        | 'MQ'
        | 'MR'
        | 'MU'
        | 'YT'
        | 'MX'
        | 'FM'
        | 'MD'
        | 'MC'
        | 'MN'
        | 'ME'
        | 'MS'
        | 'MA'
        | 'MZ'
        | 'MM'
        | 'NA'
        | 'NR'
        | 'NP'
        | 'NL'
        | 'NC'
        | 'NZ'
        | 'NI'
        | 'NE'
        | 'NG'
        | 'NU'
        | 'NF'
        | 'KP'
        | 'MP'
        | 'NO'
        | 'OM'
        | 'PK'
        | 'PW'
        | 'PS'
        | 'PA'
        | 'PG'
        | 'PY'
        | 'PE'
        | 'PH'
        | 'PN'
        | 'PL'
        | 'PT'
        | 'PR'
        | 'QA'
        | 'CG'
        | 'RO'
        | 'RU'
        | 'RW'
        | 'RE'
        | 'BL'
        | 'SH'
        | 'KN'
        | 'LC'
        | 'MF'
        | 'PM'
        | 'VC'
        | 'WS'
        | 'SM'
        | 'SA'
        | 'SN'
        | 'RS'
        | 'SC'
        | 'SL'
        | 'SG'
        | 'SX'
        | 'SK'
        | 'SI'
        | 'SB'
        | 'SO'
        | 'ZA'
        | 'GS'
        | 'KR'
        | 'SS'
        | 'ES'
        | 'LK'
        | 'SD'
        | 'SR'
        | 'SJ'
        | 'SE'
        | 'CH'
        | 'SY'
        | 'ST'
        | 'TW'
        | 'TJ'
        | 'TZ'
        | 'TH'
        | 'TL'
        | 'TG'
        | 'TK'
        | 'TO'
        | 'TT'
        | 'TN'
        | 'TR'
        | 'TM'
        | 'TC'
        | 'TV'
        | 'UG'
        | 'UA'
        | 'AE'
        | 'GB'
        | 'US'
        | 'UM'
        | 'VI'
        | 'UY'
        | 'UZ'
        | 'VU'
        | 'VA'
        | 'VE'
        | 'VN'
        | 'WF'
        | 'EH'
        | 'YE'
        | 'ZM'
        | 'ZW'
        | 'KI'
        | 'HK'
        | 'AX'
        | undefined;
    setInputValue: Dispatch<SetStateAction<string>>;
    setIsValid: Dispatch<SetStateAction<boolean>>;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
    withDarkTheme?: boolean;
    autoFocus?: boolean;
    height?: number;
}
const PhoneNumberInput: FunctionComponent<PhoneNumberInputProps> = ({
    defaultCode,
    setInputValue,
    setIsValid,
    marginBottom,
    marginHorizontal,
    marginTop,
    withDarkTheme,
    autoFocus,
    height,
}) => {
    const phoneRef = useRef<PhoneInput | null>(null);
    const [phoneValue, setPhoneValue] = useState<string>('');

    useEffect(() => {
        if (phoneRef?.current) {
            setIsValid(phoneRef?.current?.isValidNumber(phoneValue));
        }
    }, [phoneValue, setIsValid]);

    return (
        <View
            style={{
                marginTop: marginTop || 32,
                marginBottom: marginBottom || 12,
                marginHorizontal: marginHorizontal || 22,
                borderWidth: 1,
                borderColor: Colors.Border,
                backgroundColor: Colors.InputBackground,
                borderRadius: 8,
                height: height ? height + 2 : 58,
            }}>
            <PhoneInput
                containerStyle={{
                    width: '100%',
                    backgroundColor: Colors.InputBackground,
                    borderRadius: 8,
                    height: height || 56,
                }}
                textContainerStyle={{
                    backgroundColor: Colors.InputBackground,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                }}
                textInputStyle={{
                    color: Colors.Black,
                    height: height || 56,
                    fontFamily: fonts.OpenSans_400,
                }}
                codeTextStyle={{
                    color: Colors.Black,
                    fontFamily: fonts.OpenSans_400,
                }}
                ref={phoneRef}
                defaultValue={phoneValue}
                defaultCode={defaultCode || 'US'}
                layout="first"
                onChangeText={(text: string) => {
                    setPhoneValue(text);
                }}
                onChangeFormattedText={(text: string) => {
                    setInputValue(text);
                }}
                withDarkTheme={withDarkTheme || false}
                withShadow={false}
                autoFocus={autoFocus || false}
                placeholder="8012345678"
            />
        </View>
    );
};

export default PhoneNumberInput;

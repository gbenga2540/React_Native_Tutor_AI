import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { INTF_ContactUS } from '../../Interface/Contact_Us/Contact_Us';
import Colors from '../../Configs/Colors/Colors';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { open_browser_with_link } from '../../Utils/Open_Browser_Link/Open_Browser_Link';
import { http_link_fix } from '../../Utils/HTTP_Link_Fix/HTTP_Link_Fix';
import BasicText from '../Basic_Text/Basic_Text';

interface ContactUsButtonProps {
    contact_us: INTF_ContactUS;
}
const ContactUsButton: FunctionComponent<ContactUsButtonProps> = ({
    contact_us,
}) => {
    return (
        <TouchableOpacity
            onPress={no_double_clicks({
                execFunc: () => {
                    open_browser_with_link({
                        url: http_link_fix({
                            http_link: contact_us?.url,
                        }),
                    });
                },
            })}
            activeOpacity={0.55}
            style={{
                flexDirection: 'row',
                height: 56,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: Colors.DarkBorder,
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <Image
                style={{
                    width: 35,
                    height: 35,
                    marginLeft: 15,
                }}
                source={contact_us?.image}
            />
            <BasicText
                inputText={contact_us?.name}
                marginLeft={20}
                textSize={16}
                textWeight={600}
            />
        </TouchableOpacity>
    );
};

export default ContactUsButton;

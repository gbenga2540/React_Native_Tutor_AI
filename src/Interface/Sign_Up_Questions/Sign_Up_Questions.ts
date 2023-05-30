import { InputModeOptions } from 'react-native/types';

export interface INTF_SignUpQuestionProps {
    id: number;
    question: string;
    inputMode?: InputModeOptions;
    placeHolder?: string;
}

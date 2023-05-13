import { InputModeOptions } from 'react-native/types';

export interface SignUpQuestionProps {
    id: number;
    question: string;
    inputMode?: InputModeOptions;
    placeHolder?: string;
}

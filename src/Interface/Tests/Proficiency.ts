import { ImageSourcePropType } from 'react-native';

export type INTF_ProficiencyTest = {
    id: number;
    englishLevel: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    question: {
        word: string;
        highlight?: string[];
    };
    instruction: {
        word: string;
        highlight?: string[];
    };
    has_image?: boolean;
    image_link?: ImageSourcePropType;
    options: {
        word: string;
        highlight?: string[];
    }[];
    multiple_choice?: boolean;
};

export type INTF_ProficiencyAnswers = { id: number; answers: number[] };

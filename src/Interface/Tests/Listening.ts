export type INTF_ListeningTest = {
    id: number;
    englishLevel: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    question: string;
    instruction: string;
    options: string[];
};

export type INTF_ListeningAnswers = { id: number; answers: number };

import {
    INTF_HomeWorkAnswers,
    INTF_HomeWorkQuestions,
} from '../../src/Interface/HomeWork/HomeWork';

export const home_work_questions: INTF_HomeWorkQuestions[] = [
    {
        id: 1,
        question: 'What are his hobbies?',
        instruction: 'Choose two correct answers.',
        options: [
            'He likes playing tennis.',
            'He likes to play tennis.',
            'He tennis likes to play.',
            'He tennis playing likes.',
        ],
        multiple_choice: true,
    },
    {
        id: 2,
        question: 'Living in the countryside is ____ than living in the city.',
        instruction: 'Choose one correct answer.',
        options: ['healthyer', 'healthy', 'healtheir', 'healthier'],
    },
    {
        id: 3,
        question: 'It is ____ today. There is no sun.',
        instruction: 'Choose one correct answer.',
        options: ['rain', 'rains', 'rainy', 'rainings'],
        multiple_choice: false,
    },
    {
        id: 4,
        question:
            'What did Helen do yesterday?\n' +
            'She went to the shopping mall, but she ____ any clothes.',

        instruction: 'Choose one correct answer.',
        options: ["didn't buy", "doesn't buy", "didn't bought", 'no buys'],
        multiple_choice: false,
    },
    {
        id: 5,
        question: 'They ____ with Jackson in the conference room.',
        instruction: 'Choose one correct answer.',
        options: ['are met', 'were meet', 'are meeting', 'are meet'],
        multiple_choice: false,
    },
];

export const proficiency_answers: INTF_HomeWorkAnswers[] = [
    { id: 1, answers: [0, 1] },
    { id: 2, answers: [0, 2] },
    { id: 3, answers: [2] },
    { id: 4, answers: [0] },
    { id: 5, answers: [2] },
];

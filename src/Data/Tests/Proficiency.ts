import {
    INTF_ProficiencyAnswers,
    INTF_ProficiencyTest,
} from '../../Interface/Tests/Proficiency';

export const proficiency_test: INTF_ProficiencyTest[] = [
    {
        id: 1,
        englishLevel: 'A2',
        question: {
            word: 'What are his hobbies?',
        },
        instruction: {
            word: 'Choose two correct answers.',
            highlight: ['two'],
        },
        options: [
            {
                word: 'He likes playing tennis.',
            },
            {
                word: 'He likes to play tennis.',
            },
            {
                word: 'He tennis likes to play.',
            },
            {
                word: 'He tennis playing likes.',
            },
        ],
        multiple_choice: true,
    },
    {
        id: 2,
        englishLevel: 'A2',
        question: {
            word: 'What time is it?',
        },
        instruction: {
            word: 'Choose two correct answers.',
            highlight: ['two'],
        },
        has_image: true,
        image_link: require('../../Images/Tests/Clock_Test.jpg'),
        options: [
            {
                word: "It's two thirty.",
            },
            {
                word: "It's half past three.",
            },
            {
                word: "It's half past two.",
            },
            {
                word: "It's two hours thirty.",
            },
        ],
        multiple_choice: true,
    },
    {
        id: 3,
        englishLevel: 'A2',
        question: {
            word: 'It is ________ today. There is no sun.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'rain',
            },
            {
                word: 'rains',
            },
            {
                word: 'rainy',
            },
            {
                word: 'rainings',
            },
        ],
        multiple_choice: false,
    },
    {
        id: 4,
        englishLevel: 'A2',
        question: {
            word:
                'What did Helen do yesterday?\n' +
                'She went to the shopping mall, but she ______ any clothes.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: "didn't buy",
            },
            {
                word: "doesn't buy",
            },
            {
                word: "didn't bought",
            },
            {
                word: 'no buys',
            },
        ],
        multiple_choice: false,
    },
    {
        id: 5,
        englishLevel: 'A2',
        question: {
            word: 'They ________ ________ with Jackson in the conference room.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'are met',
            },
            {
                word: 'were meet',
            },
            {
                word: 'are meeting',
            },
            {
                word: 'are meet',
            },
        ],
        multiple_choice: false,
    },
    {
        id: 6,
        englishLevel: 'A2',
        question: {
            word: 'Living in the countryside is ______ than living in the city.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'healthyer',
            },
            {
                word: 'healthy',
            },
            {
                word: 'healtheir',
            },
            {
                word: 'healthier',
            },
        ],
    },
    {
        id: 7,
        englishLevel: 'A2',
        question: {
            word: 'Describing people \nAdam is ______ many sports and is a ______-known athlete.',
            highlight: ['Describing', 'people'],
        },
        instruction: {
            word: 'Choose one correct answers.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'interested in / good',
            },
            {
                word: 'interesting on / well',
            },
            {
                word: 'interesting on / good',
            },
            {
                word: 'interested in / well',
            },
        ],
    },
    {
        id: 8,
        englishLevel: 'A2',
        question: {
            word: 'Describing past experiences \n' + 'He has ______.',
            highlight: ['Describing', 'past', 'experiences'],
        },
        instruction: {
            word: 'Choose one correct answers.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'been to Japan',
            },
            {
                word: 'to Japan been',
            },
            {
                word: 'to Japan went',
            },
            {
                word: 'went to Japan',
            },
        ],
    },
    {
        id: 9,
        englishLevel: 'A2',
        question: {
            word: 'They ______ when the phone rang.',
        },
        instruction: {
            word: 'Choose one correct answers.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'were slept',
            },
            {
                word: 'were sleeping',
            },
            {
                word: 'have slept',
            },
            {
                word: 'are sleeping',
            },
        ],
    },
    {
        id: 10,
        englishLevel: 'A2',
        question: {
            word: 'What did she do in the clothes shop?',
        },
        instruction: {
            word: 'Choose two correct answers.',
            highlight: ['two'],
        },
        options: [
            {
                word: 'She took off her jeans and tried a new dress on.',
                highlight: ['took', 'off', 'tried', 'on'],
            },
            {
                word: 'She took out her jeans and tried a new dress in.',
                highlight: ['took', 'off', 'tried', 'in'],
            },
            {
                word: 'She took her jeans out and tried in a new dress.',
                highlight: ['took', 'off', 'tried', 'in'],
            },
            {
                word: 'She took her jeans off and tried on a new dress.',
                highlight: ['took', 'off', 'tried', 'on'],
            },
        ],
        multiple_choice: true,
    },
    {
        id: 11,
        englishLevel: 'B1',
        question: {
            word: 'We ______ to work, but now we take the train.',
        },
        instruction: {
            word: 'Choose one correct answers.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'use to drove',
            },
            {
                word: 'used to drive',
            },
            {
                word: 'use to drive',
            },
            {
                word: 'used to drove',
            },
        ],
    },
    {
        id: 12,
        englishLevel: 'B1',
        question: {
            word: 'Which sentence is NOT correct?',
        },
        instruction: {
            word: 'Choose one wrong answers.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'Neither Ben or Candice still live there.',
            },
            {
                word: 'She can’t paint, and neither can I.',
            },
            {
                word: 'Either we buy some food, or we need to order in.',
            },
            {
                word: 'We are going to lose either way.',
            },
        ],
    },
    {
        id: 13,
        englishLevel: 'B1',
        question: {
            word: 'I love to travel, but ______ to Australia since 2010.',
        },
        instruction: {
            word: 'Choose one correct answers.',
            highlight: ['one'],
        },
        options: [
            {
                word: "I didn't been",
            },
            {
                word: 'I haven’t been',
            },
            {
                word: 'I didn’t went',
            },
            {
                word: 'I haven’t went',
            },
        ],
    },
    {
        id: 14,
        englishLevel: 'B1',
        question: {
            word: 'Sarah had an exam yesterday and she’s really nervous about the results.',
            highlight: ['nervous'],
        },
        instruction: {
            word: 'Choose two correct answers which have a similar meaning to "nervous".',
            highlight: ['two'],
        },
        options: [
            {
                word: 'confident',
            },
            {
                word: 'positive',
            },
            {
                word: 'worried',
            },
            {
                word: 'anxious',
            },
        ],
        multiple_choice: true,
    },
    {
        id: 15,
        englishLevel: 'B1',
        question: {
            word: 'On the phone \nCustomer: "I’d like to speak to the manager please." \nReceptionist: "I’m sorry I can’t ______ now because she’s in a meeting. Please give me your number and I’ll ask her to ______.',
            highlight: ['\nCustomer:', '\nReceptionist:'],
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'ring you through / phone you back',
            },
            {
                word: 'put through you / call back you',
            },
            {
                word: 'ring through you / phone back you',
            },
            {
                word: 'put you through / call you back',
            },
        ],
    },
    {
        id: 16,
        englishLevel: 'B1',
        question: {
            word: 'His wife ______ their weekend, before they spoke about it.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'is already planning',
            },
            {
                word: 'has already planned',
            },
            {
                word: 'did already plan',
            },
            {
                word: 'had already planned',
            },
        ],
    },
    {
        id: 17,
        englishLevel: 'B1',
        question: {
            word: 'Giving opinions \nJack: "Wow! That was an awesome concert." \nKaren: "Yeah it was incredible. However, their first album is my favourite." \n\nKaren agrees that the concert was amazing, __________ their earlier music is still the best.',
            highlight: ['Giving', 'opinions', '\nJack:', '\nKaren:'],
        },
        instruction: {
            word: 'Choose two correct answer.',
            highlight: ['two'],
        },
        options: [
            {
                word: 'since she thinks',
            },
            {
                word: 'but in her opinion',
            },
            {
                word: 'because she is sure that',
            },
            {
                word: 'although she feels that',
            },
        ],
        multiple_choice: true,
    },
    {
        id: 18,
        englishLevel: 'B1',
        question: {
            word: 'Her phone isn’t in her purse; it…',
        },
        instruction: {
            word: 'Complete the sentence.',
        },
        options: [
            {
                word: 'mustn’t be in her car',
            },
            {
                word: 'must be in her car',
            },
            {
                word: 'mightn’t be in her car',
            },
            {
                word: 'ought in her car',
            },
        ],
    },
    {
        id: 19,
        englishLevel: 'B1',
        question: {
            word: 'You were late for an important meeting. You ______ home earlier.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'should have left',
            },
            {
                word: 'must have left',
            },
            {
                word: 'must had left',
            },
            {
                word: 'should had left',
            },
        ],
    },
    {
        id: 20,
        englishLevel: 'B1',
        question: {
            word: 'She really hates cleaning her apartment, but she has no problem with the cooking.',
            highlight: [
                'really',
                'hates',
                'has',
                'no',
                'problem',
                'with',
                'the',
            ],
        },
        instruction: {
            word: 'Choose one correct answer which has a similar meaning.',
            highlight: ['one'],
        },
        options: [
            {
                word: "can't mind / doesn't stand",
            },
            {
                word: "doesn't mind / can't stand",
            },
            {
                word: "can't stand / doesn't mind",
            },
            {
                word: "doesn't stand / can't mind",
            },
        ],
    },
    {
        id: 21,
        englishLevel: 'B2',
        question: {
            word: 'Job opportunities \n\nBrother: "Why didn’t ____you accept that amazing job offer in New York last year?" \nSister: "Because my home is in London."',
            highlight: ['Job', 'opportunities', '\n\nBrother:', '\nSister:'],
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'If she has started the job, she would moved abroad.',
                highlight: ['has', 'started', 'would', 'moved'],
            },
            {
                word: 'If she did started the job, she would have moved abroad.',
                highlight: ['did', 'started', 'would', 'have', 'moved'],
            },
            {
                word: 'If she had started the job, she would moved abroad.',
                highlight: ['had', 'started', 'would', 'moved'],
            },
            {
                word: 'If she had started the job, she would have moved abroad.',
                highlight: ['had', 'started', 'would', 'have', 'moved'],
            },
        ],
    },
    {
        id: 22,
        englishLevel: 'B2',
        question: {
            word: 'They ________ to go to the beach every winter when they lived in Canada.',
        },
        instruction: {
            word: 'Choose one correct answer',
            highlight: ['one'],
        },
        options: [
            {
                word: 'were used',
            },
            {
                word: 'used',
            },
            {
                word: 'had used',
            },
            {
                word: 'got used',
            },
        ],
    },
    {
        id: 23,
        englishLevel: 'B2',
        question: {
            word: 'I don’t mind if you upgrade the software, ______ you back up the hard drive first.',
        },
        instruction: {
            word: 'Choose two correct answers.',
            highlight: ['two'],
        },
        options: [
            {
                word: 'as long as',
            },
            {
                word: 'whereas',
            },
            {
                word: 'provided that',
            },
            {
                word: 'while',
            },
        ],
        multiple_choice: true,
    },
    {
        id: 24,
        englishLevel: 'B2',
        question: {
            word: 'I ______ for the last few months, because I moved to Madrid and had to study Spanish.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'haven’t been working',
            },
            {
                word: 'haven’t working',
            },
            {
                word: 'wouldn’t have worked',
            },
            {
                word: '’m not working',
            },
        ],
    },
    {
        id: 25,
        englishLevel: 'B2',
        question: {
            word: 'I’m sure that ______ her first autobiography by the end of the year.',
        },
        instruction: {
            word: 'Choose two correct answers which have a similar meaning.',
            highlight: ['two'],
        },
        options: [
            {
                word: 'she has finished',
            },
            {
                word: 'she’ll have finished',
            },
            {
                word: 'she’ll be finished',
            },
            {
                word: 'she’s going to have finished',
            },
        ],
        multiple_choice: true,
    },
    {
        id: 26,
        englishLevel: 'B2',
        question: {
            word: "The plane left ten minutes ago, but I couldn't fly because I didn't take my passport.If I ______ my passport, I ______ on the plane right now.",
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: "hadn't forgotten / would be",
            },
            {
                word: "hadn't forgotten / will be",
            },
            {
                word: "had remembered / wouldn't be",
            },
            {
                word: 'had remembered / will be',
            },
        ],
    },
    {
        id: 27,
        englishLevel: 'B2',
        question: {
            word: 'Brenda always forgets to set her alarm. She missed an important meeting.',
        },
        instruction: {
            word: 'Choose the best sentence based on the information below.',
        },
        options: [
            {
                word: 'If Brenda hadn’t set her alarm, she would have made it to the meeting.',
            },
            {
                word: 'If the meeting were later, Brenda would have made it.',
            },
            {
                word: 'If Brenda had set her alarm, she would have made it to the meeting.',
            },
            {
                word: 'If Brenda had set her alarm, she would have missed the meeting.',
            },
        ],
    },
    {
        id: 28,
        englishLevel: 'B2',
        question: {
            word: 'Who is the team leader least impressed by? \n\nTeam performance notes\n "Overall the team has performed extremely well on this project. Sarah is extremely motivated, Linda is disorganized but still very passionate, Jason is quite pessimistic and fairly stubborn, and Max is incredibly enthusiastic. However, they all seem to get on well with each other."',
            highlight: ['\n\nTeam', 'performance', 'notes\n'],
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'Jason',
            },
            {
                word: 'Sarah',
            },
            {
                word: 'Max',
            },
            {
                word: 'Linda',
            },
        ],
    },
    {
        id: 29,
        englishLevel: 'C1',
        question: {
            word: 'The Education Secretary negotiated with protesting teachers yesterday, and they have now insisted that she schedules a second meeting.\n\nThe politician ______ an agreement with the teachers yesterday.',
        },
        instruction: {
            word: 'Choose one correct answer that reflects the outcome of the negotiation.',
            highlight: ['one'],
        },
        options: [
            {
                word: "can't have reached",
            },
            {
                word: "needn't have reached",
            },
            {
                word: "shouldn't have reached",
            },
            {
                word: 'must have reached',
            },
        ],
    },
    {
        id: 30,
        englishLevel: 'C1',
        question: {
            word: 'The Chinese economy is rapidly growing and continues to _________ year after year.',
        },
        instruction: {
            word: 'Choose one correct answer.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'accentuate',
            },
            {
                word: 'articulate',
            },
            {
                word: 'accelerate',
            },
            {
                word: 'predicate',
            },
            {
                word: "I don't know",
            },
        ],
    },
    {
        id: 31,
        englishLevel: 'C1',
        question: {
            word: 'It is ______ difficult to ensure the protection of endangered species.',
        },
        instruction: {
            word: 'Choose two correct answers.',
            highlight: ['two'],
        },
        options: [
            {
                word: 'incredibly',
            },
            {
                word: 'absolutely',
            },
            {
                word: 'extremely',
            },
            {
                word: 'totally',
            },
        ],
        multiple_choice: true,
    },
    {
        id: 32,
        englishLevel: 'C1',
        question: {
            word: 'They had no idea about their sister’s medical problems, because she hadn’t explained what was happening. She hasn’t ______ about her poor health.',
        },
        instruction: {
            word: 'Choose one correct answer which has a similar meaning.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'given them their picture',
            },
            {
                word: 'taken the picture for them',
            },
            {
                word: 'kept them in the picture',
            },
            {
                word: 'made the picture for them',
            },
        ],
    },
    {
        id: 33,
        englishLevel: 'C1',
        question: {
            word:
                'After being accepted for a scholarship at university, I was unsure whether it was a good idea to live on campus.\n\n' +
                'I was ______ about living on campus.',
        },
        instruction: {
            word: 'Choose one correct answer which has a similar meaning.',
            highlight: ['one'],
        },
        options: [
            {
                word: 'minding about',
            },
            {
                word: 'keeping it in mind',
            },
            {
                word: 'changing two minds',
            },
            {
                word: 'in two minds',
            },
        ],
    },
    {
        id: 34,
        englishLevel: 'C1',
        question: {
            word: 'The formulation of new prescriptions drugs has had a profound effect on the overall health of developing nations.',
        },
        instruction: {
            word: 'Which word is incorrect in this sentence?',
        },
        options: [
            {
                word: 'formulation',
            },
            {
                word: 'prescriptions',
            },
            {
                word: 'has',
            },
            {
                word: 'developing',
            },
        ],
    },
    {
        id: 35,
        englishLevel: 'C1',
        question: {
            word: 'Approximately €5,000,000 has already been donated to charity for last week’s natural disaster.',
            highlight: ['Approximately'],
        },
        instruction: {
            word: 'Choose one correct answer which has a similar meaning to "approximately".',
            highlight: ['one'],
        },
        options: [
            {
                word: 'Somewhere the range of',
            },
            {
                word: 'Somewhere the amount of',
            },
            {
                word: 'Somewhere in the region of',
            },
            {
                word: 'Somewhere on the subject of',
            },
        ],
    },
    {
        id: 36,
        englishLevel: 'C1',
        question: {
            word: 'Below is an extract from the text: \n"Regrettably, a large number ..."',
            highlight: ['\n"Regrettably,'],
        },
        instruction: {
            word: 'Choose one correct answer which has a similar meaning to "regrettably".',
            highlight: ['one'],
        },
        options: [
            {
                word: 'Seriously',
            },
            {
                word: 'Allegedly',
            },
            {
                word: 'Unfortunately',
            },
            {
                word: 'Consequently',
            },
        ],
    },
];

export const proficiency_answers: INTF_ProficiencyAnswers[] = [
    { id: 1, answers: [0, 1] },
    { id: 2, answers: [0, 2] },
    { id: 3, answers: [2] },
    { id: 4, answers: [0] },
    { id: 5, answers: [2] },
    { id: 6, answers: [3] },
    { id: 7, answers: [3] },
    { id: 8, answers: [0] },
    { id: 9, answers: [1] },
    { id: 10, answers: [0, 3] },
    { id: 11, answers: [1] },
    { id: 12, answers: [0] },
    { id: 13, answers: [1] },
    { id: 14, answers: [2, 3] },
    { id: 15, answers: [3] },
    { id: 16, answers: [3] },
    { id: 17, answers: [1, 3] },
    { id: 18, answers: [1] },
    { id: 19, answers: [0] },
    { id: 20, answers: [1] },
    { id: 21, answers: [3] },
    { id: 22, answers: [1] },
    { id: 23, answers: [0, 2] },
    { id: 24, answers: [0] },
    { id: 25, answers: [0, 1] },
    { id: 26, answers: [0] },
    { id: 27, answers: [2] },
    { id: 28, answers: [0] },
    { id: 29, answers: [3] },
    { id: 30, answers: [2] },
    { id: 31, answers: [0, 2] },
    { id: 32, answers: [2] },
    { id: 33, answers: [3] },
    { id: 34, answers: [1] },
    { id: 35, answers: [2] },
    { id: 36, answers: [2] },
];

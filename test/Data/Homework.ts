export const home_work: (
    | {
          question: string;
          question_type: 'audio-options';
          options: (string | number)[];
      }
    | { question: string; question_type: 'audio' }
    | { question: string; question_type: 'fill-gap'; options: string[] }
    | { question: string; question_type: 'objective'; options: string[] }
    | { question: string; question_type: 'text-input' }
)[] = [
    {
        question: 'Tiger',
        question_type: 'audio-options',
        options: ['Lion', 'Tiger', 'Girl, Boy'],
    },
    {
        question: 'Messi is the Greatest Footballer alive',
        question_type: 'audio',
    },
    {
        question:
            'My name ____ Dominion, I love Anime ____ I sell Anime Merch ____ Favorite anime ____ Attack on Titan. ',
        question_type: 'fill-gap',
        options: ['in', 'is', 'my', 'you', 'for'],
    },
    {
        question:
            'Messi scored 91 goals in a season, Harry Kane Scored 50 goals in a season, who scored the highest?',
        question_type: 'objective',
        options: ['Messi', 'Ronaldo', 'Harry Kane', 'James'],
    },
    {
        question:
            'Messi scored 91 goals in a season Harry Kane Scored 50 goals in a season  who scored the highest?',
        question_type: 'text-input',
    },
];

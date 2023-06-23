import {
    INTF_ListeningAnswers,
    INTF_ListeningTest,
} from '../../Interface/Tests/Listening';

export const listening_test: INTF_ListeningTest[] = [
    {
        id: 1,
        englishLevel: 'A2',
        question:
            "Hi Samia,\nJust a quick email to say that sounds like a great idea. Saturday is better for me because I'm meeting my parents on Sunday. So if that's still good for you, why don't you come here? Then you can see the new flat and all the work we've done on the kitchen since we moved in. We can eat at home and then go for a walk in the afternoon.\nSee you soon! Gregor",
        instruction: 'Choose one correct answer.',
        options: [
            "Sunday is better for me because I'm meeting my parents on Sunday.",
            "Saturday is better for me because I'm meeting my parents on Sunday.",
            "Sunday is better for me because I'm meeting my friends on Sunday.",
        ],
    },
    {
        id: 2,
        englishLevel: 'B1',
        question:
            "Whether you're travelling to the islands or the mountains of Thailand, you're likely to spend at least one night in its capital city on the way. Bangkok might be noisy and polluted but it's also an exciting city with plenty of things to see and do. We offer the following options where to go:\nThe Khao San Road was a famous traveller spot even before Leonardo di Caprio's character in the film The Beach stayed there. But it's noisy, not very pretty and not very Thai. For something more authentic, Phra Kanong offers an alternative place to stay, with its fantastic street markets where everyday Bangkok people eat, work and live. It's not as convenient for the main tourist sites, but it has a Skytrain station so you can be at the Grand Palace in 20 minutes.",
        instruction: 'Choose one correct answer.',
        options: [
            'Phra Kanong has fantastic street markets where everyday Bangkok people eat, work and live.',
            'Phra Kanong is noisy, not very pretty and not very Thai.',
            "Phra Kanong became a famous traveller spot after Leonardo di Caprio's character in the film The Beach stayed there.",
        ],
    },
    {
        id: 3,
        englishLevel: 'B2',
        question:
            "Carter came by later while Sam was chopping wood. He pulled out a pile of paper from his back pocket and held it out.\n'Don't pick up your mail often, do you?'\nSam took it without a glance and dropped the envelopes onto the bench.\n'Never,' he replied and waited for Carter to say why he was here. The fact it was Carter's house was no explanation and they both knew it. Carter twisted his hat round and round, licking his lips and clearing his throat.\n'Nice work fixing those fences,' he said finally.\n'I'll be back to the beginning soon,' Sam said. It wasn't a complaint. A fence that took a year to repair meant another year's work to the man who did it well.\n'Don't you ever want to take a holiday?'\n'And go where?' A holiday meant being back out in the real world, a place even people like Carter travelled to escape from. Sam's escape was his reality and he wasn't going back.",
        instruction: 'Choose one correct answer.',
        options: [
            'Sam received letters very often',
            'Sam dropped the envelops onto the bench',
            'Sam is going to take a holiday soon',
        ],
    },
    {
        id: 4,
        englishLevel: 'C1',
        question:
            "Much of today's business is conducted across international borders, and while the majority of the global business community might share the use of English as a common language, the nuances and expectations of business communication might differ greatly from culture to culture. Here are three basic areas of differences in the business etiquette around the world: \n1. Addressing someone.\nWhen discussing this topic in a training course, a German trainee and a British trainee got into a hot debate about whether it was appropriate for someone with a doctorate to use the corresponding title on their business card. The British trainee maintained that anyone who wasn't a medical doctor expecting to be addressed as 'Dr' was disgustingly pompous and full of themselves. The German trainee, however, argued that the hard work and years of education put into earning that PhD should give them full rights to expect to be addressed as 'Dr'.\n2. Smiling\nA famous Russian proverb states that 'a smile without reason is a sign of idiocy' and a so-called 'smile of respect' is seen as insincere and often regarded with suspicion in Russia. Yet in countries like the United States, Australia and Britain, smiling is often interpreted as a sign of openness, friendship and respect, and is frequently used to break the ice.\n3.Eye contact\nAn American or British person might be looking their client in the eye to show that they are paying full attention to what is being said, but if that client is from Japan or Korea, they might find the direct eye contact awkward or even disrespectful. In the Middle East, eye contact across genders is considered inappropriate, although eye contact within a gender could signify honesty and truthfulness.",
        instruction: 'Choose one correct answer.',
        options: [
            "The British trainee maintained that hard work and years of education give full rights to anyone to be addressed as 'Dr'.",
            'In countries like the United States, Australia and Britain, a smile without reason is a sign of idiocy.',
            'In the Middle East, eye contact across genders is considered inappropriate.',
        ],
    },
    {
        id: 5,
        englishLevel: 'C2',
        question:
            "Your manager stops you and says she needs to have a word about your performance in the recent project. When you step into her office on Monday morning she begins by praising you for the good work you've done on the project, and you wonder if this is the obligatory praise that starts off the typical 'feedback sandwich'.\nIn an attempt to inject some positivity into their feedback, many managers rely on sandwiching negative feedback between two positive comments. However, employees start to perceive positive feedback as simply a form of sugarcoating the negatives. Instead, positive feedback should not simply be seen as something to cushion the negative, but should be delivered so as to reinforce and encourage good performance. Below are three tips to help you make positive feedback count.\n1. Don't always follow positive feedback with negative feedback\nWhen positive and negative feedback always appear to go hand in hand, the positives can become devalued and ignored. Ensure there are times when positive feedback is given for its own sake and resist the temptation to offer constructive criticism.\n2. Cultivate a 'growth mindset'\nPsychologist and 'growth mindset' proponent Carol Dweck spoke of the plasticity of the brain and our ability to develop skills and talents that we might not have been good at to start with. Research suggests that by focusing on the process of how things are done – praising effort, experimentation and problem-solving strategies – we can encourage the development of new skills and the continued honing of talents.\n3. Create a culture of offering positive feedback\nMake giving positive feedback part of your team/department/company culture. Offer informal positive feedback when making small talk or when walking down a corridor. Feedback doesn't have to only come from the higher ranks either. Encourage peer feedback among team members and actively ask them for positive comments on each other's performances on tasks. ",
        instruction: 'Choose one correct answer.',
        options: [
            'the positives can become devalued and ignored when positive and negative feedback always appear to go hand in hand.',
            'Research suggests that by focusing only on the process of how things are done won’t support the development of new skills of talents.',
            "Feedback doesn't have to only come from the higher ranks.",
        ],
    },
];

export const listening_answers: INTF_ListeningAnswers[] = [
    { id: 1, answers: 0 },
    { id: 2, answers: 0 },
    { id: 3, answers: 0 },
    { id: 4, answers: 0 },
    { id: 5, answers: 0 },
];

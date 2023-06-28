import { INTF_Conversation } from '../../src/Interface/Conversation/Conversation';
import { INTF_Lesson } from '../../src/Interface/Lesson/Lesson';

export const exams: INTF_Lesson[] = [
    {
        lesson_id: 1,
        title: 'Beginner',
        imageURL: 'https://placeimg.com/200/200/any',
        progress: 100,
    },
    {
        lesson_id: 2,
        title: 'Pre-Intermediate',
        imageURL: 'https://source.unsplash.com/random/200x200',
        progress: 60,
    },
    {
        lesson_id: 3,
        title: 'Intermediate',
        imageURL: 'https://picsum.photos/200/200',
        progress: 30,
    },
    {
        lesson_id: 4,
        title: 'Post-Intermediate',
        imageURL: 'https://source.unsplash.com/random/200x200',
        progress: 15,
    },
    {
        lesson_id: 5,
        title: 'Confident',
        imageURL: 'https://source.unsplash.com/random/200x200',
        progress: 15,
    },
];

import { INTF_SignUpQuestionProps } from '../../Interface/Sign_Up_Questions/Sign_Up_Questions';

export const sign_up_questions = ({
    question_type,
}: {
    question_type: number;
}): INTF_SignUpQuestionProps => {
    switch (question_type) {
        case 1:
            return {
                id: 1,
                question: 'What is your Name?',
                inputMode: 'text',
                placeHolder: 'John Doe',
            };
        default:
            return {
                id: 2,
                question: 'What is your Name?',
                inputMode: 'text',
                placeHolder: 'John Doe',
            };
    }
};

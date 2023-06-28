export const card_number_checker = ({
    card_number,
}: {
    card_number: string;
}) => {
    if (card_number) {
        const sanitizedNumber = card_number.replace(/\D/g, '');
        const digits = sanitizedNumber.split('').map(Number);

        let sum = 0;
        let shouldDouble = false;

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = digits[i];
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    } else {
        return false;
    }
};

export const high_nums_converter = ({ number }: { number: number }) => {
    if (number) {
        if (number > 999999999999) {
            return `${number?.toString()?.slice(0, 1)}.${number
                ?.toString()
                ?.slice(1, 2)}T`;
        } else if (number > 99999999999) {
            return `${number?.toString()?.slice(0, 3)}.${number
                ?.toString()
                ?.slice(3, 4)}B`;
        } else if (number > 9999999999) {
            return `${number?.toString()?.slice(0, 2)}.${number
                ?.toString()
                ?.slice(2, 3)}B`;
        } else if (number > 999999999) {
            return `${number?.toString()?.slice(0, 1)}.${number
                ?.toString()
                ?.slice(1, 2)}B`;
        } else if (number > 99999999) {
            return `${number?.toString()?.slice(0, 3)}.${number
                ?.toString()
                ?.slice(3, 4)}M`;
        } else if (number > 9999999) {
            return `${number?.toString()?.slice(0, 2)}.${number
                ?.toString()
                ?.slice(2, 3)}M`;
        } else if (number > 999999) {
            return `${number?.toString()?.slice(0, 1)}.${number
                ?.toString()
                ?.slice(1, 2)}M`;
        } else if (number > 99999) {
            return `${number?.toString()?.slice(0, 3)}.${number
                ?.toString()
                ?.slice(3, 4)}K`;
        } else if (number > 9999) {
            return `${number?.toString()?.slice(0, 2)}.${number
                ?.toString()
                ?.slice(2, 3)}K`;
        } else if (number > 999) {
            return `${number?.toString()?.slice(0, 1)}.${number
                ?.toString()
                ?.slice(1, 2)}K`;
        } else {
            return number?.toString();
        }
    } else if (number === 0) {
        return '0';
    } else {
        return '';
    }
};

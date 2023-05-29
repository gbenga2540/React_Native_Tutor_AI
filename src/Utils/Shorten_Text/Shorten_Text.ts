export const shorten_text = ({ text, limit }: { text: string; limit: number }) => {
        if (text?.length > limit) {
                return `${text?.slice(0, limit)}...`;
        } else {
                return text;
        }
};

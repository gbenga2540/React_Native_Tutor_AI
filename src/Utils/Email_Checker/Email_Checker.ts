export const email_checker = ({ email }: { email: string }) => {
        if (email?.length > 4 && email?.includes('@') && email.includes('.')) {
                return true;
        } else {
                return false;
        }
};

export const regex_email_checker = ({ email }: { email: string }) => {
        const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validator.test(email);
};

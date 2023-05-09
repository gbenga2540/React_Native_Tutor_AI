export const email_checker = ({ email }: { email: string }) => {
    if (email?.length > 4 && email?.includes('@') && email.includes('.')) {
        return true;
    } else {
        return false;
    }
};

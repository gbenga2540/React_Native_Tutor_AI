export const regex_email_checker = ({ email }: { email: string }) => {
    const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validator.test(email?.trim());
};

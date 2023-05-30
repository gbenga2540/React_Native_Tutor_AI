export const get_image_format = ({ mime }: { mime: string }) => {
    if (mime?.includes('/')) {
        const find_slash = mime?.indexOf('/');
        return mime?.slice(find_slash + 1, mime?.length);
    } else {
        return '';
    }
};

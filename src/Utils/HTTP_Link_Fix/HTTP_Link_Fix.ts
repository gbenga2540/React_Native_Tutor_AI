export const http_link_fix = ({ http_link }: { http_link: string }) => {
    if (http_link && http_link?.startsWith('http://')) {
        return http_link?.replace('http://', 'https://');
    }
    if (http_link && http_link?.startsWith('www.')) {
        return http_link?.replace('www.', 'https://www.');
    }
    return http_link;
};

export const http_link_fix = ({ http_link }: { http_link: string }) => {
        if (http_link.startsWith('http://')) {
                return http_link.replace('http://', 'https://');
        }
        return http_link;
};

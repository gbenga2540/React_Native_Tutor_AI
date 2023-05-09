export const query_id = ({ id }: { id?: any }) => {
    return {
        blogs: 'blogs',
        foryoublogs: 'foryoublogs',
        trendingblogs: 'trendingblogs',
        blog_with_id: ['blogs', id],
        author_blogs_with_id: ['author_blogs', id],
        user_with_id: ['users', id],
        tags: 'tags',
    };
};

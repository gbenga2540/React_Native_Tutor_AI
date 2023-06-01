export const sort_glossary_by_name = ({
    glossary_list,
}: {
    glossary_list: { word: string; meaning: string }[];
}): { word: string; meaning: string }[] => {
    glossary_list.sort((a, b) => {
        const nameA = a?.word?.toUpperCase() || '';
        const nameB = b?.word?.toUpperCase() || '';

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return glossary_list;
};

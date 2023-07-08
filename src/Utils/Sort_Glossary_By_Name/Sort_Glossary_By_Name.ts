import { INTF_Glossary } from '../../Interface/Glossary/Glossary';

const capitalize_words = ({
    data,
}: {
    data: INTF_Glossary[];
}): INTF_Glossary[] => {
    const capitalizedArray = data.map(item => {
        const capitalizedWord =
            (item.word as string).slice(0, 1).toUpperCase() +
            (item.word as string).slice(1);
        return { ...item, word: capitalizedWord };
    });

    return capitalizedArray || [];
};

export const sort_glossary_by_name = ({
    glossary_list,
}: {
    glossary_list: INTF_Glossary[];
}): INTF_Glossary[] => {
    const new_data = capitalize_words({ data: [...glossary_list] });
    new_data.sort((a, b) => {
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

    return new_data;
};

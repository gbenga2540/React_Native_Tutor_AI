export const Avatars = {
    Male: [
        { name: 'Harry', type: 'British' },
        { name: 'Ethan', type: 'Australian' },
        { name: 'Kyle', type: 'American' },
        { name: 'George', type: 'British' },
    ],
    Female: [
        { name: 'Emma', type: 'British' },
        { name: 'Willow', type: 'Australian' },
        { name: 'Emily', type: 'American' },
        { name: 'Anne', type: 'British' },
    ],
};

export const AvatarVoices = {
    Male: [
        { label: 'Choose Voice', value: 'Choose Voice' },
        ...(Avatars?.Male?.map(item => ({
            label: item.name,
            value: item.name,
        })) || []),
    ],
    Female: [
        { label: 'Choose Voice', value: 'Choose Voice' },
        ...(Avatars?.Female?.map(item => ({
            label: item.name,
            value: item.name,
        })) || []),
    ],
};

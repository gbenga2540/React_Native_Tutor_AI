export const Avatars = {
    Male: ['Mark', 'David', 'Brian'],
    Female: ['Susan', 'Lilly', 'Debby'],
};

export const AvatarVoices = {
    Male: [
        { label: 'Choose Voice', value: 'Choose Voice' },
        ...(Avatars?.Male?.map(item => ({ label: item, value: item })) || []),
    ],
    Female: [
        { label: 'Choose Voice', value: 'Choose Voice' },
        ...(Avatars?.Female?.map(item => ({ label: item, value: item })) || []),
    ],
};

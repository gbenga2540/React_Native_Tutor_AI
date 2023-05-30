export const clamp_value = ({
    value,
    minValue,
    maxValue,
}: {
    value: number;
    minValue?: number;
    maxValue?: number;
}) => {
    return Math.min(Math.max(value || 0, minValue || 0), maxValue || 100);
};

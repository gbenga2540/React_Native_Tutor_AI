export const is_object_empty = ({ object }: { object: Object }) => {
    if (object === undefined || object === null) {
        return false;
    } else {
        if (Object.keys(object).length === 0) {
            return true;
        } else {
            return false;
        }
    }
};

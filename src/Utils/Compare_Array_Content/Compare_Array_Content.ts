export const compare_array_contents = ({
    arr1,
    arr2,
}: {
    arr1: any[];
    arr2: any[];
}) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    let arr2Copy = arr2.slice();
    for (let i = 0; i < arr1.length; i++) {
        const index = arr2Copy.indexOf(arr1[i]);
        if (index !== -1) {
            arr2Copy.splice(index, 1);
        } else {
            return false;
        }
    }
    return true;
};

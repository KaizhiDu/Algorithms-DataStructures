const quickSort = (arr) => {
    if (arr.length === 1 || arr.length === 0) {
        return arr;
    }
    const left = [];
    const right = [];
    const pivot = arr[arr.length - 1];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}


const arr = [3, 6, 8, 10, 1, 2, 1];

const result = quickSort(arr);

console.log(JSON.stringify(result,0,2));

// k小的idx：k-1
// k大的idx：n-k

const partition = (array, left, right) => {
    const pivot = array[right];
    let pivotIdx = left;
    for (let i = left; i < right; i++) {
        if (array[i] < pivot) {
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        }
    }
    [array[right], array[pivotIdx]] = [array[pivotIdx], array[right]];
    return pivotIdx;
}


const quickSelect = (arr, k, type, left = 0, right = arr.length - 1) => {
    const idx = type === 'max' ? arr.length - k : k - 1;
    const pivotIdx = partition(arr, left, right);
    if (pivotIdx < idx) {
        return quickSelect(arr, k, type,pivotIdx + 1, right);
    }
    if (pivotIdx > idx) {
        return quickSelect(arr, k, type, left, pivotIdx - 1);
    }
    return arr[pivotIdx];
}


const arr = [1,23,3,45,5,43,6,23,7,2,11];

const result = quickSelect(arr, 1, 'max');

console.log(JSON.stringify(result,0,2));

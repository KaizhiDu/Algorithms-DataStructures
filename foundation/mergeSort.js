
const merge = (left, right) => {
    const result = [];
    let leftIdx = 0;
    let rightIdx = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] < right[rightIdx]) {
            result.push(left[leftIdx]);
            leftIdx++;
        } else {
            result.push(right[rightIdx]);
            rightIdx++;
        }
    }
    const restLeft = left.slice(leftIdx);
    const restRight = right.slice(rightIdx);
    return result.concat(restLeft).concat(restRight);
}

const mergeSort = (arr) => {
    if (arr.length === 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), (mergeSort(right)))
}


const arr = [3, 6, 8, 10, 1, 2, 1];

const result = mergeSort(arr);

console.log(JSON.stringify(result,0,2));

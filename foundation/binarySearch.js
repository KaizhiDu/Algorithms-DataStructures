const binarySearch = (arr, val, left = 0, right = arr.length - 1) => {
    if (left > right) {
        return 'no found!';
    }
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) {
        return mid;
    }
    if (arr[mid] > val) {
        return binarySearch(arr, val, left, mid - 1);
    } else {
        return binarySearch(arr, val, mid + 1, right);
    }
}


const sortList = [1,2,3,4,5,6,7,8,9,10];

console.log(binarySearch(sortList, 1));
console.log(binarySearch(sortList, 2));
console.log(binarySearch(sortList, 3));
console.log(binarySearch(sortList, 4));
console.log(binarySearch(sortList, 5));
console.log(binarySearch(sortList, 6));
console.log(binarySearch(sortList, 7));
console.log(binarySearch(sortList, 8));
console.log(binarySearch(sortList, 9));
console.log(binarySearch(sortList, 10));
console.log(binarySearch(sortList, 17));
console.log(binarySearch(sortList, 0));







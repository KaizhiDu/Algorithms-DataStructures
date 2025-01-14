// 215. Kth Largest Element
//
// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Can you solve it without sorting?
//
// Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
//
// Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

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


const findKthLargest = (nums, k, left = 0, right = nums.length - 1) => {
    const idx = nums.length - k;
    const pivotIdx = partition(nums, left, right);
    if (pivotIdx < idx) {
        return findKthLargest(nums, k,pivotIdx + 1, right);
    }
    if (pivotIdx > idx) {
        return findKthLargest(nums, k, left, pivotIdx - 1);
    }
    return nums[pivotIdx];
}


console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4));

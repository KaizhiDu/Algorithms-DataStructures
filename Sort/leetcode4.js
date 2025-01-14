// 4. Median of Two Sorted Arrays
//
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).
//
// Example 1:
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.
//
// Example 2:
// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

// const medianOfTwoSortedArray = (nums1, nums2) => {
//
//     let combinedArray = [];
//     let current1 = 0;
//     let current2 = 0;
//     while (nums1[current1] !== undefined && nums2[current2] !== undefined) {
//         if (nums1[current1] < nums2[current2]) {
//             combinedArray.push(nums1[current1]);
//             current1++;
//         } else {
//             combinedArray.push(nums2[current2]);
//             current2++;
//         }
//     }
//
//     if (nums1[current1] !== undefined) {
//         combinedArray = combinedArray.concat(nums1.slice(current1));
//     }
//
//     if (nums2[current2] !== undefined) {
//         combinedArray = combinedArray.concat(nums2.slice(current2));
//     }
//
//     return combinedArray.length % 2 === 1 ?
//         combinedArray[Math.floor(combinedArray.length / 2)]
//         : ((combinedArray[Math.floor(combinedArray.length / 2)] + combinedArray[Math.floor(combinedArray.length / 2 - 1)]) / 2);
//
// }

const partition = (nums, left, right) => {
    const pivot = nums[right];
    let pivotIdx = left;
    for (let i = left; i < right; i++) {
        if (nums[i] < pivot) {
            [nums[i], nums[pivotIdx]] = [nums[pivotIdx], nums[i]];
            pivotIdx++;
        }
    }
    [nums[right], nums[pivotIdx]] = [nums[pivotIdx], nums[right]];
    return pivotIdx;
}

const getKVal = (nums, k, left = 0, right = nums.length - 1) => {
    const kIndex = k - 1;
    const pivotIdx = partition(nums, left, right);
    if (kIndex > pivotIdx) {
        return getKVal(nums, k, pivotIdx + 1, right)
    }
    if (kIndex < pivotIdx) {
        return getKVal(nums, k, left, pivotIdx - 1)
    }
    return nums[pivotIdx];
}

const findMedianSortedArrays = (nums1, nums2) => {
    const nums = nums1.concat(nums2);
    const isEven = nums.length % 2 === 0;
    const mid = Math.floor(nums.length / 2);
    return isEven ? (getKVal(nums, mid+1) + getKVal(nums,mid)) / 2 : getKVal(nums, mid+1)
}

console.log(findMedianSortedArrays([1,3], [2,7]));

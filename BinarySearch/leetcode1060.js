// 1060. Missing Element in Sorted Array
// Given an integer array nums which is sorted in ascending order and all of its elements are unique and given also an integer k,
// return the kth missing number starting from the leftmost number of the array.
//
// Example 1:
// Input: nums = [4,7,9,10], k = 1
// Output: 5
// Explanation: The first missing number is 5.
//
// Example 2:
// Input: nums = [4,7,9,10], k = 3
// Output: 8
// Explanation: The missing numbers are [5,6,8,...], hence the third missing number is 8.
//
// Example 3:
// Input: nums = [1,2,4], k = 3
// Output: 6
// Explanation: The missing numbers are [3,5,6,7,...], hence the third missing number is 6.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var missingElement = function(nums, k) {
    const missingCount = (idx) => nums[idx] - nums[0] - idx;

    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right + 1) / 2);
        if (missingCount(mid) < k) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }

    return nums[left] + (k - missingCount(left));
};

// var missingElement = function(nums, k) {
//     let current = nums[0] + 1;
//     const missing = [];
//     let idx = 1;
//
//     while (missing.length < k) {
//             if (current + 1 === nums[idx]) {
//                 idx++;
//                 missing.push(current);
//                 current++;
//             } else if (current === nums[idx]) {
//                 idx++;
//             }
//             else {
//                 missing.push(current);
//             }
//         current++;
//     }
//     return missing[k - 1];
// };

console.log(missingElement([1,2,3], 3));

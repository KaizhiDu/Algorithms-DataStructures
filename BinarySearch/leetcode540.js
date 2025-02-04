// 540. Single Element in a Sorted Array
//
// You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.
// Return the single element that appears only once.
// Your solution must run in O(log n) time and O(1) space.
//
// Example 1:
// Input: nums = [1,1,2,3,3,4,4,8,8]
// Output: 2
//
// Example 2:
// Input: nums = [3,3,7,7,10,11,11]
// Output: 10

/**
 * @param {number} x
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) {
            return nums[mid];
        }
        if (mid % 2 === 0) {
            if (nums[mid] === nums[mid + 1]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        } else {
            if (nums[mid] === nums[mid + 1]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }
    return -1;
};

console.log(singleNonDuplicate([3,3,7,7,10,11,11]));

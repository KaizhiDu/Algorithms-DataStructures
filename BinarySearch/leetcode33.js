// 33. Search in Rotated Sorted Array
// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// You must write an algorithm with O(log n) runtime complexity.
//
// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
//
// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
//
// Example 3:
// Input: nums = [1], target = 0
// Output: -1


const binarySearch = (nums, target, left, right) => {
    if (left > right) {
        return -1;
    }
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
        return mid;
    }
    if (nums[mid] < target) {
        return binarySearch(nums, target, mid + 1, right);
    } else {
        return binarySearch(nums, target, left, mid - 1);
    }
}


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let findIdx = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
            findIdx = i;
            break;
        }
    }
    const second = nums.slice(findIdx);
    const first = nums.slice(0, findIdx);

    const firstRes = binarySearch(first, target, 0, first.length - 1);
    const secondRes = binarySearch(second, target, 0, second.length - 1);

    if (firstRes !== -1) {
        return firstRes;
    } else if (secondRes !== -1) {
        return secondRes + findIdx;
    } else {
        return -1;
    }

};

console.log(search([3,1], 3));
// console.log(search([4,5,6,7,0,1,2], 0));

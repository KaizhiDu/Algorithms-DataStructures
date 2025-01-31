// 34. Find First and Last Position of Element in Sorted Array
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.
//
// Example 1:
// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
//
// Example 3:
// Input: nums = [], target = 0
// Output: [-1,-1]

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


var searchRange = function(nums, target) {
    const findIdx = binarySearch(nums, target, 0, nums.length - 1);
    if (findIdx === null) {
        return [-1,-1];
    }
    let left = findIdx;
    let right = findIdx;
    while (nums[left - 1] !== undefined && nums[left - 1] === target ) {
        left--;
    }
    while (nums[right + 1] !== undefined && nums[right + 1] === target ) {
        right++;
    }
    return [left, right];
}

console.log(searchRange([5,7,7,8,8,10], 8));

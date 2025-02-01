// 74. Search a 2D Matrix
// You are given an m x n integer matrix matrix with the following two properties:
//
// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.
// You must write a solution in O(log(m * n)) time complexity.
//
// Example 1:
// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true
//
// Example 2:
// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// Output: false

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

var searchMatrix = function(matrix, target) {
    let sortedList = [];
    for (const sortedListElement of matrix) {
        sortedList = sortedList.concat(sortedListElement);
    }
    console.log(sortedList);
    const findIdx = binarySearch(sortedList, target, 0, sortedList.length - 1);
    return findIdx !== -1;
}


console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3));

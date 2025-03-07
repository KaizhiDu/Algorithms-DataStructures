// 167. Two Sum II - Input Array Is Sorted
// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
//
//     Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
//
// The tests are generated such that there is exactly one solution. You may not use the same element twice.
//
//     Your solution must use only constant extra space.
//
//     Example 1:
//
// Input: numbers = [1,2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
//
//     Example 2:
//
// Input: numbers = [2,3,4], target = 6
// Output: [1,3]
// Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
//
//     Example 3:
//
// Input: numbers = [-1,0], target = -1
// Output: [1,2]
// Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].


    /**
 * @param {string} s
 * @return {number}
 */
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1;

    while (left < right) {  // 只需要 left < right
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1];  // 题目要求 1-based index
        }

        if (sum < target) {
            left++;  // 当前和太小，左指针右移
        } else {
            right--; // 当前和太大，右指针左移
        }
    }

    return [];
};

console.log(twoSum([-1,0], -1));

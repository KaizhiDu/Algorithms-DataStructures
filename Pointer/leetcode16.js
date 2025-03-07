// 16. 3Sum Closest
// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
//     Return the sum of the three integers.
//     You may assume that each input would have exactly one solution.
//
//     Example 1:
//
// Input: nums = [-1,2,1,-4], target = 1
                // [-4,-1,1,2]

// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
//
//     Example 2:
//
// Input: nums = [0,0,0], target = 1
// Output: 0
// Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var threeSumClosest = function(nums, target) {
//     nums = nums.sort((a, b) => a - b);
//     let closest = Infinity;
//     let res = '';
//     for (var i = 0; i < nums.length; i++) {
//         const current = nums[i];
//         let left = i + 1;
//         let right = nums.length - 1;
//         while (left < right) {
//             const sum = current + nums[left] + nums[right];
//             const close = Math.abs(sum - target);
//             if (close < closest) {
//                 closest = close;
//                 res = sum;
//             }
//             right--;
//         }
//     }
//     return res;
// };
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    let closest = Infinity;
    let res = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < nums.length - 1; i++) {
        let left = i + 1, right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === target) return sum;

            if (Math.abs(sum - target) < Math.abs(res - target)) {
                res = sum;
            }

            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
};



console.log(threeSumClosest([0,0,0], 1))

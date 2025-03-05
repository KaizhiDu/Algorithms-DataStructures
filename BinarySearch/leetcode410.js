// 410. Split Array Largest Sum
// Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.
//     Return the minimized largest sum of the split.
//     A subarray is a contiguous part of the array.
//
//     Example 1:
// Input: nums = [7,2,5,10,8], k = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays.
//     The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
//
// Example 2:
// Input: nums = [1,2,3,4,5], k = 2
// Output: 9
// Explanation: There are four ways to split nums into two subarrays.
//     The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function(nums, m) {
    const check = (mid) => {
        let count = 1, sum = 0;
        for (const num of nums) {
            sum += num;
            if (sum > mid) { // 超过 mid，需要新开一个子数组
                count++;
                sum = num; // 新子数组的第一个元素
            }
        }
        return count <= m; // 能否分成 <= m 组
    };

    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);
    let result = right;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (check(mid)) {
            result = mid;  // 记录当前可行的 mid
            right = mid - 1; // 尝试更小的最大子数组和
        } else {
            left = mid + 1; // mid 太小，需要增大
        }
    }

    return result;
};


console.log(splitArray([1,2,3,4,5], 2));

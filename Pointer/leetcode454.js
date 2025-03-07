// 454. 4Sum II
// Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that:
//     0 <= i, j, k, l < n
// nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
//
// Example 1:
// Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
// Output: 2
// Explanation:
//     The two tuples are:
//     1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
//     2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
//
// Example 2:
// Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
// Output: 1

/*
* @param {number[]} nums1
* @param {number[]} nums2
* @param {number[]} nums3
* @param {number[]} nums4
* @return {number}
    */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const map = {};
    for (let a of nums1) {
        for (let b of nums2) {
            map[a + b] = (map[a + b] || 0) + 1;
        }
    }
    let res = 0;
    for (let c of nums3) {
        for (let d of nums4) {
            const sum = 0 - (c + d);
            if (map[sum]) {
                res = res + map[sum];
            }
        }
    }
    return res;
};


console.log(fourSumCount([-1,-1],[-1,1],[-1,1],[1,-1]));

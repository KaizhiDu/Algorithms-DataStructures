// 698. Partition to K Equal Sum Subsets
// Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.
//
// Example 1:
// Input: nums = [4,3,2,3,5,2,1], k = 4
// Output: true
// Explanation: It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
//
// Example 2:
// Input: nums = [1,2,3,4], k = 3
// Output: false
//
//
// Constraints:
// 	1 <= k <= nums.length <= 16
// 1 <= nums[i] <= 104
// The frequency of each element is in the range [1, 4].

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// var canPartitionKSubsets = function(nums, k) {
// 	const total = nums.reduce((acc, cur) => acc + cur, 0);
// 	if (total % k !== 0) return false;
// 	const value = total / k;
// 	nums.sort((a, b) => a - b);
// 	const find = Array(nums.length).fill(false);
// 	let result = false;
// 	const dfs = (path, idx) => {
// 		const total = path.reduce((acc, cur) => acc + nums[cur], 0);
// 		if (find.every(each => !!each)) {
// 			result = true;
// 			return true;
// 		};
// 		if (total >= value) return false;
// 		for (let i = idx; i < nums.length; i++) {
// 			if (find[i]) continue;
// 			if (total + nums[i] === value) {
// 				for (const each of path) {
// 					find[each] = true;
// 				}
// 				find[i] = true;
// 				dfs([], i + 1);
// 			} else {
// 				path.push(i);
// 				dfs(path, i + 1);
// 			}
//
// 			if (total + nums[i] === value) {
// 				for (const each of path) {
// 					find[each] = false;
// 				}
// 				find[i] = false;
// 			} else {
// 				path.pop();
// 			}
// 		}
// 	}
//
// 	dfs([], 0);
//
//
// };

var canPartitionKSubsets = function(nums, k) {
	const total = nums.reduce((acc, cur) => acc + cur, 0);
	if (total % k !== 0) return false;
	const target = total / k;
	nums.sort((a, b) => b - a);

	const used = new Array(nums.length).fill(false);

	const dfs = (start, kRemaining, currentSum) => {
		if (kRemaining === 0) return true;
		if (currentSum === target) {
			return dfs(0, kRemaining - 1, 0);
		};
		for (let i = start; i < nums.length; i++) {
			if (used[i] || currentSum+nums[i] > target) continue;
			used[i] = true;
			if (dfs(i + 1, kRemaining, currentSum + nums[i])) return true;
			used[i] = false;
		}
		return false;
	};

	return dfs(0, k, 0);
};


console.log(canPartitionKSubsets([4,3,2,3,5,2,1],4))

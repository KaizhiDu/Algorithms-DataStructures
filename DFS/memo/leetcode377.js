// 377. Combination Sum IV
// Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.
// The test cases are generated so that the answer can fit in a 32-bit integer.
//
// Example 1:
// Input: nums = [1,2,3], target = 4
// Output: 7
// Explanation:
// 	The possible combination ways are:
// 	(1, 1, 1, 1)
// 	(1, 1, 2)
// 	(1, 2, 1)
// 	(1, 3)
// 	(2, 1, 1)
// 	(2, 2)
// 	(3, 1)
// Note that different sequences are counted as different combinations.
//
// Example 2:
// Input: nums = [9], target = 3
// Output: 0


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var combinationSum4 = function(nums, target) {
// 	const memo = new Set();
// 	const dfs = (path, sum) => {
// 		const key = path.join('-');
// 		if (memo.has(key)) return null;
// 		if (sum === target) {
// 			memo.add(key);
// 			return;
// 		}
// 		if (sum > target) {
// 			return;
// 		}
// 		for (let i = 0; i < nums.length; i++) {
// 			path.push(nums[i]);
// 			dfs(path, sum + nums[i]);
// 			path.pop();
// 		}
// 	}
// 	dfs([], 0);
// 	return memo.size;
// };

var combinationSum4 = function(nums, target) {
	const memo = new Map();
	const dfs = (remain) => {
		if (remain === 0) return 1;
		if (memo.has(remain)) return memo.get(remain);
		if (remain < 0) return 0;
		let count = 0;
		for (const num of nums) {
			const nextRemain = remain - num;
			const res = dfs(nextRemain);
			count += res;
		}
		memo.set(remain, count);
		return count;
	}

	return dfs(target);
};

console.log(combinationSum4([1,2,3], 4));

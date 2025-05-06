// 90. Subsets II
// Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.
//
// Example 1:
// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
//
// Example 2:
// Input: nums = [0]
// Output: [[],[0]]
//
// Constraints:
// 	1 <= nums.length <= 10
// 	-10 <= nums[i] <= 10


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
	nums = nums.sort((a, b) => a - b);
	const result = [];
	const dfs = (path, idx) => {
		result.push([...path]);
		for (let i = idx; i < nums.length; i++) {
			if (i > idx && nums[i] === nums[i-1]) continue;
			path.push(nums[i]);
			dfs(path, i + 1);
			path.pop();
		}
	}
	dfs([], 0);
	return result;
};



console.log(subsetsWithDup([1,2,2]));

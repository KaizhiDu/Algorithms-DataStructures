// 40. Combination Sum II
// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
// 	Each number in candidates may only be used once in the combination.
// 	Note: The solution set must not contain duplicate combinations.
//
// 	Example 1:
// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// 	[
// 		[1,1,6],
// 		[1,2,5],
// 		[1,7],
// 		[2,6]
// 	]
//
// Example 2:
// Input: candidates = [2,5,2,1,2], target = 5
// Output:
// 	[
// 		[1,2,2],
// 		[5]
// 	]

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
	const set = new Set();
	candidates = candidates.sort((a, b) => a - b);
	const result = [];
	const dfs = (path, idx) => {
		const total = path.reduce((acc, item) => acc + item, 0);
		if (total === target) {
			const str = path.join(',');
			if (set.has(str)) return;
			result.push([...path]);
			set.add(str);
			return;
		}
		if (total > target) return;
		for (let i = idx; i < candidates.length; i++) {
			if (i > idx && candidates[i] === candidates[i - 1]) continue;
			path.push(candidates[i]);
			dfs(path, i + 1);
			path.pop();
		}
	}
	dfs([], 0);
	return result;
};



// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// 	[
// 		[1,1,6],
// 		[1,2,5],
// 		[1,7],
// 		[2,6]
// 	]
console.log(combinationSum2([10,1,2,7,6,1,5], 8));
// console.log(combinationSum2([2,5,2,1,2], 5));

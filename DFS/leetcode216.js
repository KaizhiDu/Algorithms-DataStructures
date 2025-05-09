// 216. Combination Sum III
// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
// Only numbers 1 through 9 are used.
// 	Each number is used at most once.
// 	Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.
//
// Example 1:
// Input: k = 3, n = 7
// Output: [[1,2,4]]
// Explanation:
// 	1 + 2 + 4 = 7
// There are no other valid combinations.
//
// Example 2:
// Input: k = 3, n = 9
// Output: [[1,2,6],[1,3,5],[2,3,4]]
// Explanation:
// 	1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// There are no other valid combinations.
//
// Example 3:
// Input: k = 4, n = 1
// Output: []
// Explanation: There are no valid combinations.
// 	Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.


/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
	const digits = [1,2,3,4,5,6,7,8,9];
	const result = [];
	const dfs = (path, idx) => {
		const total = path.reduce((acc, item) => acc + item, 0);
		if (total === n && path.length === k) {
			result.push([...path]);
			return;
		}
		if (total > n) return;
		if (path.length >= k) return;
		for (let i = idx; i < digits.length; i++) {
			path.push(digits[i]);
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
console.log(combinationSum3(3, 9));
// console.log(combinationSum2([2,5,2,1,2], 5));

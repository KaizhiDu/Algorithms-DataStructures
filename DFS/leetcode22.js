// 22. Generate Parentheses
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
//
// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
//
// Example 2:
// Input: n = 1
// Output: ["()"]

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
	if (n === 0) return [];
	let paths = [];
	const dfs = (path, left, right) => {
		if (path.length === 2 * n) {
			paths.push(path);
			return;
		}
		if (left < n) {
			dfs(path + '(',left+1, right);
		}
		if (right < left) {
			dfs(path + ')', left, right+1);
		}
	}

	dfs('', 0, 0);

	return paths;

};

console.log(generateParenthesis(3));

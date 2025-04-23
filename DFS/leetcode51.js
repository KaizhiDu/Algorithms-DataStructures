// 51. N-Queens
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.
//
// Example 1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
//
// Example 2:
// Input: n = 1
// Output: [["Q"]]

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {

	const dfs = (position, path = []) => {
		const [i,j] = position || [];
		if (i<0 || j<0 || i===n || j===n) return path;
		let willBeKill = false;
		for (const item of path) {
			const [row, col] = item || [];
			if (i === row ||
				j === col ||
				Math.abs(i - row) === Math.abs(j - col)
			) {
				willBeKill = true;
				break;
			}
		}
		if (willBeKill) {
			return path;
		}
		path.push(position);
		let longestPath = []
		for (let k = 0; k < n; k++) {
			const dfsPath = dfs([i+1, k], path);
			if (dfsPath.length > longestPath.length) longestPath = dfsPath;
		}
		return longestPath;
	}

	const result = [];

	for (let i = 0; i < n; i++) {
		const res = dfs([0, i]);
		if (res.length === n) {
			result.push(res);
		}
	}

	console.log(result);

};


solveNQueens(4);

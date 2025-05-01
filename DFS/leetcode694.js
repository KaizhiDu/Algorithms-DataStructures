// 694. Number of Distinct Islands
// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
// An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.
// Return the number of distinct islands.
//
// Example 1:
// Input: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
// Output: 1
//
// Example 2:
// Input: grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]
// Output: 3



/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function(grid) {
	const totalRows = grid.length;
	const totalCols = grid[0].length;
	const visited = Array.from({ length: totalRows }, () => Array(totalCols).fill(false));

	let checkPath = '';

	const dfs = (path, row, col) => {
		if (
			row < 0 ||
			col < 0 ||
			row >= totalRows ||
			col >= totalCols ||
			visited[row][col] ||
			grid[row][col] === 0
		) {
			return;
		}

		visited[row][col] = true;
		checkPath = `${checkPath}${path}`;

		const directions = [
			[-1, 0, 'u'],
			[1, 0, 'd'],
			[0, -1, 'l'],
			[0, 1, 'r']
		]
		for (const direction of directions) {
			const [moveRow, moveCol, direct] = direction || [];
			const newRow = row + moveRow;
			const newCol = col + moveCol;
			dfs(`${path}${direct}`, newRow, newCol);
		}
	}

	const result = {};
	for (let i = 0; i < totalRows; i++) {
		for (let j = 0; j < totalCols; j++) {
			if (grid[i][j] === 1 && !visited[i][j]) {
				dfs('o', i, j);
				result[checkPath] = true;
				checkPath = '';
			}
		}
	}
	return Object.keys(result).length;
};




// console.log(numDistinctIslands([[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]));
console.log(numDistinctIslands([[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]));

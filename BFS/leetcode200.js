// 200. Number of Islands
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
//
// Example 1:
// Input: grid = [
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
// ]
// Output: 1
//
// Example 2:
// Input: grid = [
//     ["1","1","0","0","0"],
//     ["1","1","0","0","0"],
//     ["0","0","1","0","0"],
//     ["0","0","0","1","1"]
// ]
// Output: 3

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
	const rows = grid.length;
	const cols = grid[0].length;
	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	let count = 0;
	for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
			if (!visited[i][j] && grid[i][j] === '1') {
					// 找到一个陆地点，并且没访问过
					count++;
				const queue = [[i, j]];
				visited[i][j] = true;
					while (queue.length > 0) {
						const [row, col] = queue.shift();
						visited[row][col] = true;
						if ((row-1 >= 0) && !visited[row-1][col] && grid[row-1][col] !== '0') {
							queue.push([row-1, col]);
						}
						if ((row+1 < grid.length) && !visited[row+1][col] && grid[row+1][col] !== '0') {
							queue.push([row+1, col]);
						}
						if ((col-1 >= 0) && !visited[row][col-1] && grid[row][col-1] !== '0') {
							queue.push([row, col-1]);
						}
						if ((col+1 < grid[i].length) && !visited[row][col+1] && grid[row][col+1] !== '0') {
							queue.push([row, col+1]);
						}
					}
			}
        }
	}
	return count;
};

console.log(numIslands([
	["1","1","0","0","0"],
	["1","1","0","0","0"],
	["0","0","1","0","0"],
	["0","0","0","1","1"]
]));


// 1293. Shortest Path in a Grid with Obstacles Elimination
// You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.
// Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.
//
// Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
// Output: 6

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(grid, k) {
	const rows = grid.length;
	const cols = grid[0].length;
	const queue = [[0,0,k]];
	const directions = [
		[0,1],
		[0,-1],
		[1,0],
		[-1,0]
	]
	let path = 0;
	const visited = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => Array(k + 1).fill(false))
	);
	visited[0][0][k] = true;

	while (queue.length) {
		const queueLength = queue.length;
		for (let i = 0; i < queueLength; i++) {
			const [row, col, attack] = queue.shift();

			if (row === rows - 1 && col === cols - 1) {
				return path;
			}

			for (const [x, y] of directions) {
				const newRow = row + x;
				const newCol = col + y;

				if (newRow >= 0 &&
					newCol >=0 &&
					newRow < rows &&
					newCol < cols
				) {
					const remainingAttack = attack - (grid[newRow][newCol] === 1 ? 1 : 0);
					if (remainingAttack >= 0 && !visited[newRow][newCol][remainingAttack]) {
						visited[newRow][newCol][remainingAttack] = true;
						queue.push([newRow, newCol, remainingAttack]);
					}
				}
			}
		}
		path++;
	}
	return -1;
};

console.log(shortestPath([[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], 1));

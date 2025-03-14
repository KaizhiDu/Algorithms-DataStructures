// 1091. Shortest Path in Binary Matrix
// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.
// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
// 	All the visited cells of the path are 0.
// All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number of visited cells of this path.
//
// Example 1:
//
// Input: grid = [[0,1],[1,0]]
// Output: 2
//
// Example 2:
// Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
// Output: 4
//
// Example 3:
// Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
// Output: -1

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
	const n = grid.length;
	if (n === 1) {
		if (grid[0][0] === 1 || grid[n-1][n-1] === 1) {
			return -1;
		} else {
			return 1;
		}
	}
	if (grid[0][0] === 1 || grid[n-1][n-1] === 1) {
		return -1;
	}
	const directions = [
		[-1,-1],
		[-1,1],
		[1,-1],
		[1,1],
		[0,1],
		[0,-1],
		[-1,0],
		[1,0],
	]
	const visited = Array.from({ length: n }, () => Array(n).fill(false));
	const queue = [[0,0]];
	visited[0][0] = true;
	let path = 1;

	// 因为是找最小路径 所以要check所有queue现有的节点
	while (queue.length > 0) {
		let size = queue.length;
		for (let i = 0; i < size; i++) {
			const current = queue.shift();
			const [row ,col] = current;
			for (const [x, y] of directions) {
				const newX = row + x;
				const newY = col + y;
				if (newX === n-1 && newY === n-1) {
					return path + 1;
				}
				if (
					newX >= 0 &&
					newY >= 0 &&
					newX < n &&
					newY < n &&
					!visited[newX][newY] &&
					grid[newX][newY] === 0
				) {
					visited[newX][newY] = true;
					queue.push([newX, newY]);
				}
			}
		}
		// 如果我们bfs所有的queue里面的节点，依旧没能找到重点。则证明我们需要继续下一层
		path++;
	}
	return -1;
};


console.log(shortestPathBinaryMatrix([[0,0,0,0,1],[1,0,0,0,0],[0,1,0,1,0],[0,0,0,1,1],[0,0,0,1,0]]));

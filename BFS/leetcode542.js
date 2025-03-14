// 542. 01 Matrix
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// 	The distance between two cells sharing a common edge is 1.
//
// Example 1:
// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]
//
// Example 2:
// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]


/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
	// 多源BFS 算法
	const rows = mat.length;
	const cols = mat[0].length;
	const visited = Array.from({ length : rows }, () => Array(cols).fill(false));
	const directions = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0]
	]
	const queue = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (mat[i][j] !== 0) {
				mat[i][j] = Infinity;
			} else {
				queue.push([i,j]);
			}
		}
	}

	while (queue.length > 0) {
		const current = queue.shift();
		const [row, col] = current;
		for (const [x, y] of directions) {
			const newRow = row + x;
			const newCol = col + y;
			if (
				newRow >= 0 &&
				newCol >= 0 &&
				newRow < rows &&
				newCol < cols &&
				mat[newRow][newCol] === Infinity &&
				!visited[newRow][newCol]
			) {
				mat[newRow][newCol] = mat[row][col] + 1;
				visited[newRow][newCol] = true;
				queue.push([newRow, newCol]);
			}
		}

	}

	return mat;

};

console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]))

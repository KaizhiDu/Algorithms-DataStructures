// 417. Pacific Atlantic Water Flow
// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
// The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
//
// Example 1:
// Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
// Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
// 	[0,4]: [0,4] -> Pacific Ocean
// 	[0,4] -> Atlantic Ocean
// 	[1,3]: [1,3] -> [0,3] -> Pacific Ocean
// 	[1,3] -> [1,4] -> Atlantic Ocean
// 	[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
// 	[1,4] -> Atlantic Ocean
// 	[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
// 	[2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
// 	[3,0]: [3,0] -> Pacific Ocean
// 	[3,0] -> [4,0] -> Atlantic Ocean
// 	[3,1]: [3,1] -> [3,0] -> Pacific Ocean
// 	[3,1] -> [4,1] -> Atlantic Ocean
// 	[4,0]: [4,0] -> Pacific Ocean
// 	[4,0] -> Atlantic Ocean
// Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
//
// Example 2:
// Input: heights = [[1]]
// Output: [[0,0]]
// Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
	const rows = heights.length;
	const cols = heights[0].length;
	const result = [];
	const directions = [
		[0, 1],
		[0, -1],
		[-1, 0],
		[1, 0]
	]
	const pacificVisited = Array.from({ length: rows }, () => Array(cols).fill(false));
	const pacificQueue = [];
	const atlanticVisited = Array.from({ length: rows }, () => Array(cols).fill(false));
	const atlanticQueue = []

	for (let i = 0; i < rows; i++) {
		pacificQueue.push([i, 0]);
		pacificVisited[i][0] = true;
	}
	for (let i = 1; i < cols; i++) {
		pacificQueue.push([0, i]);
		pacificVisited[0][i] = true;
	}
	while (pacificQueue.length) {
		const [row, col] = pacificQueue.shift();
		for (const [x, y] of directions) {
			const newRow = row + x;
			const newCol = col + y;
			if (
				newRow >=0 &&
				newCol >= 0 &&
				newRow < rows &&
				newCol < cols &&
				!pacificVisited[newRow][newCol] &&
				heights[row][col] <= heights[newRow][newCol]
			) {
				pacificQueue.push([newRow, newCol]);
				pacificVisited[newRow][newCol] = true;
			}
		}
	}

	for (let i = 0; i < rows; i++) {
		atlanticQueue.push([i, cols - 1]);
		atlanticVisited[i][cols - 1] = true;
	}
	for (let i = 0; i < cols - 1; i++) {
		atlanticQueue.push([rows - 1,i]);
		atlanticVisited[rows - 1][i] = true;
	}

	while (atlanticQueue.length) {
		const [row, col] = atlanticQueue.shift();
		if (pacificVisited[row][col]) {
			result.push([row, col]);
		}
		for (const [x, y] of directions) {
			const newRow = row + x;
			const newCol = col + y;
			if (
				newRow >=0 &&
				newCol >= 0 &&
				newRow < rows &&
				newCol < cols &&
				!atlanticVisited[newRow][newCol] &&
				heights[row][col] <= heights[newRow][newCol]
			) {
				atlanticQueue.push([newRow, newCol]);
				atlanticVisited[newRow][newCol] = true;

			}
		}
	}
	return result;
};

console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]));

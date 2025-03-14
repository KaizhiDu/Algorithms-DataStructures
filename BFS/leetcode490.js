// 490. The Maze
// There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.
// Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination, otherwise return false.
// You may assume that the borders of the maze are all walls (see examples).
//
// Example 1:
// Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
// Output: true
// Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.
//
// Example 2:
// Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
// Output: false
// Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */

var hasPath = function(maze, start, destination) {
	const rows = maze.length;
	const [destRow, destCol] = destination;
	const cols = maze[0].length;
	const queue = [start];
	const [startRow, startCol] = start;
	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	visited[startRow][startCol] = true;
	const directions = [
		[0,-1],
		[0,1],
		[-1,0],
		[1,0]
	]

	while (queue.length > 0) {
		const current = queue.shift();
		const [row, col] = current;
		if (destRow === row && destCol === col) {
			return true;
		}
		for (const dir of directions) {
			const [x, y] = dir;
			let nextRow = row + x;
			let nextCol = col + y;
			while (
				nextRow >= 0 &&
				nextRow < rows &&
				nextCol >= 0 &&
				nextCol < cols &&
				maze[nextRow][nextCol] === 0
				) {
				nextRow = nextRow + x;
				nextCol = nextCol + y;
			}
			const newRow = nextRow - x;
			const newCol = nextCol - y;
			if (!visited[newRow][newCol]) {
				visited[newRow][newCol] = true;
				queue.push([newRow, newCol]);
			}
		}
	}
	return false;
};

console.log(hasPath([[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], [0,4], [4,4]));

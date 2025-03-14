// 130. Surrounded Regions
// You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:
// 	Connect: A cell is connected to adjacent cells horizontally or vertically.
// 	Region: To form a region connect every 'O' cell.
// 	Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells and none of the region cells are on the edge of the board.
// 	To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.
//
// 	Example 1:
// Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
// Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
// Explanation:
// 	In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.
//
// 	Example 2:
// Input: board = [["X"]]
// Output: [["X"]]


/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
	const rows = board.length;
	const cols = board[0].length;
	const directions = [
		[0,-1],
		[0,1],
		[-1,0],
		[1,0]
	]
	const visited = Array.from({length: rows}, () => Array(cols).fill(false));

	const bfs = (node) => {
		// 如果边界有O,就要bfs 所有遍历到的点都是 safe点
		const queue = [node];
		while (queue.length) {
			const [ row, col ] = queue.shift();
			if (board[row][col] === 'O') {
				visited[row][col] = true;
				board[row][col] = 'S';
				for (const direction of directions) {
					const [x, y] = direction;
					const newRow = row + x;
					const newCol = col + y;
					if (newRow >= 0 &&
						newCol >= 0 &&
						newRow < rows &&
						newCol < cols &&
						!visited[newRow][newCol] &&
						board[newRow][newCol] === 'O'
					) {
						queue.push([newRow, newCol]);
					}
				}
			}
		}
	}

	for (let i = 0; i < rows; i++) {
		if (board[i][0] === 'O') {
			bfs([i, 0]);
		}
		if (board[i][cols - 1] === 'O') {
			bfs([i, cols - 1]);
		}
	}

	for (let i = 0; i < cols; i++) {
		if (board[0][i] === 'O') {
			bfs([0, i]);
		}
		if (board[rows - 1][i] === 'O') {
			bfs([rows - 1, i]);
		}
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (board[i][j] === 'O') {
				board[i][j] = 'X';
			}
			if (board[i][j] === 'S') {
				board[i][j] = 'O';
			}
		}
	}


};

solve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]);

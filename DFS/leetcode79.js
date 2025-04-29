// 79. Word Search
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
// vertically neighboring. The same letter cell may not be used more than once.
//
// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
//
// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
//
// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false



/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
	const totalRows = board.length;
	const totalCols = board[0].length;
	const visited = Array.from({ length: board.length }, () => Array(board[0].length).fill(false));
	let pass = false;
	const dfs = (path, visited, row, col) => {
		if (pass) return null;
		if (path.length > word.length) return null;
		if (path === word) {
			pass = true;
		}
		const directions = [
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		]
		for (const direct of directions) {
			const [r, c] = direct || [];
			const newRow = row + r;
			const newCol = col + c;
			if (newRow < 0 || newCol < 0 || newRow === totalRows || newCol === totalCols || visited[newRow][newCol]) {
				continue;
			}
			const value = board[newRow][newCol];
			visited[newRow][newCol] = true;
			dfs(path+value, visited, newRow, newCol);
			visited[newRow][newCol] = false;
		}
	}

	for (let i = 0; i < totalRows; i++) {
		for (let j = 0; j < totalCols; j++) {
			const eachVisited = visited.map(row => [...row]);
			eachVisited[i][j] = true;
			dfs(board[i][j], eachVisited, i, j);
			if (pass) {
				return true;
			}
		}
	}
	return false;
};

// console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], 'ABCD'));
console.log(exist([["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "B", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"]], 'AB'));

// 73. Set Matrix Zeroes
// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
//You must do it in place.
// Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]


var setZeroes = function(matrix) {
    const set = new Set();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0 && !set.has(`${i}-${j}`)) {
                let rowLength = matrix.length;
                let colLength = matrix[i].length;
                while (rowLength) {
                    matrix[rowLength - 1][j] = 0;
                    set.add(`${rowLength - 1}-${j}`);
                    rowLength --;
                }
                while (colLength) {
                    matrix[i][colLength - 1] = 0;
                    set.add(`${i}-${colLength - 1}`);
                    colLength --;
                }
            }
        }
    }
    return matrix;
}


console.log(setZeroes([[1,1,1],[1,0,1],[1,1,1]]))

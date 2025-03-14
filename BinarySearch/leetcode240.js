// 240. Search a 2D Matrix II
// Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:
// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
//
// Example 1:
// Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// Output: true
//
// Example 2:
// Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
// Output: false


var searchMatrix = function(matrix, target) {
    let row = 0;
    let col = matrix[0].length - 1;
    while (true) {
        const current = matrix[row][col];
        if (current === target) {
            return true;
        }
        if (target < current) {
            col --;
            if (col < 0) {
                return false;
            }
        } else {
            row ++;
            if (row >= matrix.length) {
                return false;
            }
        }
    }
}


console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 101));

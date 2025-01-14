// leetcode 54
// Given an m x n matrix, return all elements of the matrix in spiral order.

// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

const a = new ListNode('right');
const b = new ListNode('down');
const c = new ListNode('left');
const d = new ListNode('up');

a.next = b;
b.next = c;
c.next = d;
d.next = a;


var spiralOrder = function(matrix) {
    let direction = a;
    let i = 0;
    let j = 0;

    const col = matrix[0].length;
    const row = matrix.length;
    const total = row * col;

    const visited = {};

    let count = 0;

    const result = [];

    while (count !== total) {
        const key = `${i}-${j}`;

        if (j + 1 === col && direction.val === 'right') {
            direction = direction.next;
        }

        if (i + 1 === row && direction.val === 'down') {
            direction = direction.next;
        }

        if (j === 0 && direction.val === 'left') {
            direction = direction.next;
        }

        let checkKey;
        if (direction.val === 'right') {
            checkKey = `${i}-${j+1}`
        }
        if (direction.val === 'down') {
            checkKey = `${i+1}-${j}`
        }
        if (direction.val === 'left') {
            checkKey = `${i}-${j-1}`
        }
        if (direction.val === 'up') {
            checkKey = `${i-1}-${j}`
        }

        if (visited[checkKey]) {
            direction = direction.next;
        }

        const value = matrix[i][j];
        result.push(value);
        visited[key] = true;

        if (direction.val === 'right') {
            j++;
        }
        if (direction.val === 'down') {
            i++;
        }
        if (direction.val === 'left') {
            j--;
        }
        if (direction.val === 'up') {
            i--;
        }
        count ++;
    }

    console.log(result);

    return result;
};




spiralOrder([[1,2,3],[4,5,6],[7,8,9]]);

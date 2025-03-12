// 314. Binary Tree Vertical Order Traversal
// Hint
// Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).
// If two nodes are in the same row and column, the order should be from left to right.
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[9],[3,15],[20],[7]]
//
// Example 2:
// Input: root = [3,9,8,4,0,1,7]
// Output: [[4],[9],[3,0,1],[8],[7]]
//
// Example 3:
// Input: root = [1,2,3,4,10,9,11,null,5,null,null,null,null,null,null,null,6]
// Output: [[4],[2,5],[1,10,9,6],[3],[11]]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var verticalOrder = function(root) {
    const queue = [[root, 0]];
    const map = new Map();
    while (queue.length > 0) {
        const pop = queue.shift();
        const [node, colIdx] = pop || [];
        if (!node) continue;
        if (!map.has(colIdx)) {
            map.set(colIdx, [node.val]);
        } else {
            map.get(colIdx).push(node.val);
        }
        if (node.left) {
            queue.push([node.left, colIdx - 1]);
        }
        if (node.right) {
            queue.push([node.right, colIdx + 1]);
        }
    }
    return Array.from(map).sort((a, b) => a[0] - b[0]).map(item => item[1]);
};


const root = new TreeNode(3);
const node2 = new TreeNode(9);
const node3 = new TreeNode(20);
const node4 = new TreeNode(15);
const node5 = new TreeNode(7);

root.left = node2;
root.right = node3;
node3.left = node4;
node3.right = node5;

console.log(verticalOrder(root));


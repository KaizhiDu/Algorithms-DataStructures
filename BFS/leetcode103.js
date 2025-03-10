// 103. Binary Tree Level Order Traversal
// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
//Output: [[3],[20,9],[15,7]]
//

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

var zigzagLevelOrder = function(root) {
    const queue = [[root, 0]];
    const result = [];
    while (queue.length) {
        const pop = queue.shift();
        const [node, position] = pop || [];
        if (!node) continue;
        if (result[position]) {
                if (position % 2 ===0) {
                    result[position].push(node.val);
                } else {
                    result[position].unshift(node.val);
                }
        } else {
            result[position] = [node.val];
        }
        if (node.left) {
            queue.push([node.left, position + 1]);
        }
        if (node.right) {
            queue.push([node.right, position + 1]);
        }
    }
    return result;
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

console.log(zigzagLevelOrder(root));


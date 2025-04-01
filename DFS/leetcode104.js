// 104. Maximum Depth of Binary Tree
// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3
//
// Example 2:
// Input: root = [1,null,2]
// Output: 2

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
 * @return {number}
 */

function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}

// var maxDepth = function(root, deep = 0) {
// 	if (!root) return root;
// 	deep++;
// 	let left = 0;
// 	let right = 0;
// 	if (root.left) {
// 		left = maxDepth(root.left, deep);
// 	}
// 	if (root.right) {
// 		right = maxDepth(root.right, deep);
// 	}
// 	return Math.max(left, right, deep);
// };

function maxDepth(root) {
	if (!root) return 0;
	return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}


const node3 = new TreeNode(3);
const node9 = new TreeNode(9);
const node20 = new TreeNode(20);
const node15 = new TreeNode(15);
const node7 = new TreeNode(7);
node3.left = node9;
node3.right = node20;
node20.left = node15;
node20.right = node7;

console.log(JSON.stringify(maxDepth(node3),0,2));



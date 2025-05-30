// 226. Invert Binary Tree
// Given the root of a binary tree, invert the tree, and return its root.
//
// Example 1:
// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]
//
// Example 2:
// Input: root = [2,1,3]
// Output: [2,3,1]
//
// Example 2:
// Input: root = []
// Output: []

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
 * @return {TreeNode}
 */
var invertTree = function(root) {
	if (!root) {
		return null;
	}
	if (root.left || root.right) {
		const temp = root.right || null;
		root.right = root.left || null;
		root.left = temp;
	}
	if (root.left) {
		invertTree(root.left);
	}
	if (root.right) {
		invertTree(root.right);
	}
	return root;
};


const treeBuilder = require('../Tool/treeBuilder');
const builder = treeBuilder([4,2,7,1,3,6,9]);
console.log(invertTree(builder.root));

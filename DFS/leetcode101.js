// 101. Symmetric Tree
// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
//
// Example 1:
// Input: root = [1,2,2,3,4,4,3]
// Output: true
//
// Example 2:
// Input: root = [1,2,2,null,3,null,3]
// Output: false

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
 * @return {boolean}
 */
var isSymmetric = function(root) {
	const leftRecursive =(node, path = []) => {
		if (!node) return null;
		path.push(node.val);
		if (node.left) {
			leftRecursive(node.left, path);
		}
		if (node.right) {
			leftRecursive(node.right, path);
		}
		return path;
	}
	const rightRecursive = (node, path = []) => {
		if (!node) return null;
		path.push(node.val);
		if (node.right) {
			rightRecursive(node.right, path);
		}
		if (node.left) {
			rightRecursive(node.left, path);
		}
		return path;
	}
	let left;
	let right;
	if (root.left) {
		left = leftRecursive(root.left);
	}
	if (root.right) {
		right = rightRecursive(root.right);
	}
	return JSON.stringify(left) === JSON.stringify(right)
};


const treeBuilder = require('../Tool/treeBuilder');
const builder = treeBuilder([1,2,2,null,3,null,3]);
console.log(isSymmetric(builder.root));

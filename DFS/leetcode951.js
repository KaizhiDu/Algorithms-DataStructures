// 951. Flip Equivalent Binary Trees
// For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.
// A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.
// Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivalent or false otherwise.
//
// Example 1:
// Flipped Trees Diagram
// Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
// Output: true
// Explanation: We flipped at nodes with values 1, 3, and 5.
//
// Example 2:
// Input: root1 = [], root2 = []
// Output: true
//
// Example 3:
// Input: root1 = [], root2 = [1]
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */

const isSame = (a, b) => {
	if (!a && !b) return true;
	if (!a || !b) return false;
	return a.val === b.val;
};

const recursive = (node1, node2) => {
	if (!node1 && !node2) return true;
	if (!node1 || !node2 || node1.val !== node2.val) return false;

	const left1 = node1.left;
	const right1 = node1.right;
	const left2 = node2.left;
	const right2 = node2.right;

	if (isSame(left1, left2) && isSame(right1, right2)) {
		return recursive(left1, left2) && recursive(right1, right2);
	} else if (isSame(left1, right2) && isSame(right1, left2)) {
		return recursive(left1, right2) && recursive(right1, left2);
	} else {
		return false;
	}
};

var flipEquiv = function(root1, root2) {
	return recursive(root1, root2);
};


const treeBuilder = require('../Tool/treeBuilder');
const builder1 = treeBuilder([1,2,3,4,5,6,null,null,null,7,8]);
const builder2 = treeBuilder([1,3,2,null,6,4,5,null,null,null,null,8,7]);
console.log(flipEquiv(builder1.root, builder2.root));

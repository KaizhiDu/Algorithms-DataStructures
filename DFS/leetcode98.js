// 98. Validate Binary Search Tree
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
// A valid BST is defined as follows:
// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
//
// Example 1:
// Input: root = [2,1,3]
// Output: true
//
// Example 2:
// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.


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
var isValidBST = function(root) {
	let prev = null;

	function inorder(node) {
		if (!node) return true;
		// 检查左子树
		const left = inorder(node.left);
		// 检查当前节点
		if (prev !== null && node.val <= prev) return false;
		prev = node.val;
		// 检查右子树
		const right = inorder(node.right);
		return left && right;
	}

	return inorder(root);
};
//
// var isValidBST = function(root) {
// 	let prev = null;
//
// 	function inorder(node) {
// 		if (!node) return true;
// 		// 检查左子树
// 		if (!inorder(node.left)) return false;
// 		// 检查当前节点
// 		if (prev !== null && node.val <= prev) return false;
// 		prev = node.val;  // 更新前一个节点为当前节点
// 		// 检查右子树
// 		return inorder(node.right);
// 	}
//
// 	return inorder(root);
// };


function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}

const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);

node2.left = node1;
node2.right = node3;

console.log(isValidBST(node2));

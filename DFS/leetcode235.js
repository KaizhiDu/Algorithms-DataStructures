// 235. Lowest Common Ancestor of a Binary Search Tree
// Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.
// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
//
// Example 1:
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// Output: 6
// Explanation: The LCA of nodes 2 and 8 is 6.
//
// Example 2:
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// Output: 2
// Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
//
// Example 3:
// Input: root = [2,1], p = 2, q = 1
// Output: 2
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
	this.val = val;
	this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
	const a = p.val;
	const b = q.val;
	if (a < root.val && b < root.val) {
		return lowestCommonAncestor(root.left, p, q);
	}
	if (a > root.val && b > root.val) {
		return lowestCommonAncestor(root.right, p, q);
	}
	return root;
};

// var lowestCommonAncestor = function(root, p, q) {
// 	if (!root || root === p || root === q) return root;
// 	const left = lowestCommonAncestor(root.left, p, q);
// 	const right = lowestCommonAncestor(root.right, p, q);
// 	if (left && right) {
// 		return root;
// 	}
// 	return left || right;
// }





const node3 = new TreeNode(3);
const node5 = new TreeNode(5);
const node6 = new TreeNode(6);
const node2 = new TreeNode(2);
const node0 = new TreeNode(0);
const node8 = new TreeNode(8);
const node9 = new TreeNode(9);
const node7 = new TreeNode(7);
const node4 = new TreeNode(4);
node6.left = node2;
node6.right = node8;
node2.left = node0;
node2.right = node4;
node8.left = node7;
node8.right = node9;
node4.left = node3;
node4.right = node5;

console.log(lowestCommonAncestor(node6, node2, node8));

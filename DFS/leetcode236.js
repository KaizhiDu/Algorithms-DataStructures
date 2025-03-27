// 236. Lowest Common Ancestor of a Binary Tree
// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
//
// Example 1:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
//
// Example 2:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
//
// Example 3:
// Input: root = [1,2], p = 1, q = 2
// Output: 1

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

function TreeNode(val) {
	this.val = val;
	this.left = this.right = null;
}

// 这个方法比较慢需要优化
// var lowestCommonAncestor = function(root, p, q) {
// 	let result = null;
// 	function dfs(node) {
// 		if (!node) return {};
// 		const leftPath = dfs(node.left);
// 		const rightPath = dfs(node.right);
// 		const path = Object.assign({}, leftPath, rightPath);
// 		path[node.val] = true;
// 		if (path[p.val] && path[q.val] && result === null) {
// 			result = node;
// 		}
// 		return path;
// 	}
// 	dfs(root);
// 	return result;
// };



var lowestCommonAncestor = function(root, p, q) {
	if (!root || root === p || root === q) return root;
	const left = lowestCommonAncestor(root.left, p, q);
	const right = lowestCommonAncestor(root.right, p, q);
	if (left && right) {
		return root;
	}
	return left || right;
}





const node3 = new TreeNode(3);
const node5 = new TreeNode(5);
const node1 = new TreeNode(1);
const node6 = new TreeNode(6);
const node2 = new TreeNode(2);
const node0 = new TreeNode(0);
const node8 = new TreeNode(8);
const node7 = new TreeNode(7);
const node4 = new TreeNode(4);
node3.left = node5;
node3.right = node1;
node5.left = node6;
node5.right = node2;
node1.left = node0;
node1.right = node8;
node2.left = node7;
node2.right = node4;

console.log(lowestCommonAncestor(node3, node5, node4));

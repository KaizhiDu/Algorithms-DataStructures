// 700. Search in a Binary Search Tree
// You are given the root of a binary search tree (BST) and an integer val.
// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.
//
// Example 1:
// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]
//
// Example 2:
// Input: root = [4,2,7,1,3], val = 5
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
	let res = null;
	const dfs = node => {
		if (!node) return node;
		if (node.val > val) {
			dfs(node.left, val);
		} else if (node.val < val) {
			dfs(node.right, val);
		} else {
			res = node;
		}
	}
	dfs(root, val);
	return res;
};

function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}

const node4 = new TreeNode(4);
const node2 = new TreeNode(2);
const node7 = new TreeNode(7);
const node1 = new TreeNode(1);
const node3 = new TreeNode(3);

node4.left = node2;
node4.right = node7;
node2.left = node1;
node2.right = node3;

console.log(searchBST(node4, 2));

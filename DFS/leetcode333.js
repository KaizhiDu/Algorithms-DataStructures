// 333. Largest BST Subtree
// Given the root of a binary tree, find the largest subtree, which is also a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes.
// A Binary Search Tree (BST) is a tree in which all the nodes follow the below-mentioned properties:
// The left subtree values are less than the value of their parent (root) node's value.
// The right subtree values are greater than the value of their parent (root) node's value.
// Note: A subtree must include all of its descendants.
//
// Example 1:
// Input: root = [10,5,15,1,8,null,7]
// Output: 3
// Explanation: The Largest BST Subtree in this case is the highlighted one. The return value is the subtree's size, which is 3.
//
// Example 2:
// Input: root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]
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

// var largestBSTSubtree = function(root) {
// 	const dfs = node => {
// 		if (!node) return { isBST: true, numberOfNodes: 0 };
// 		// return -> numberOfNodes, isBST
// 		const left = dfs(node.left) || {};
// 		const right = dfs(node.right) || {};
// 		const maxNumberOfNodes = Math.max(left.numberOfNodes || 0, right.numberOfNodes || 0);
// 		const totalNumberOfNodes = (left.numberOfNodes || 0) + (right.numberOfNodes || 0);
// 		const isBST = (!left && !right) || (left.isBST && right.isBST);
// 		const leftValue = node.left ? node.left.val : -Infinity;
// 		const rightValue = node.right ? node.right.val : Infinity;
// 		const bst = isBST && node.val < rightValue && node.val > leftValue;
// 		return {
// 			isBST: bst,
// 			numberOfNodes: bst ? totalNumberOfNodes + 1 : maxNumberOfNodes,
// 		}
// 	}
// 	const { numberOfNodes } = dfs(root);
// 	return numberOfNodes;
// };

var largestBSTSubtree = function(root) {
	const dfs = node => {
		if (!node) return { isBST: true, numberOfNodes: 0, min: Infinity, max: -Infinity };

		const left = dfs(node.left);
		const right = dfs(node.right);

		const isBST = left.isBST && right.isBST && (node.val > left.max) && (node.val < right.min);

		if (isBST) {
			const numberOfNodes = left.numberOfNodes + right.numberOfNodes + 1;
			const min = Math.min(node.val, left.min);
			const max = Math.max(node.val, right.max);
			return { isBST: true, numberOfNodes, min, max };
		}

		return { isBST: false, numberOfNodes: Math.max(left.numberOfNodes, right.numberOfNodes) };
	}

	return dfs(root).numberOfNodes;
};


function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}

const node10 = new TreeNode(10);
const node5 = new TreeNode(5);
const node15 = new TreeNode(15);
const node1 = new TreeNode(1);
const node8 = new TreeNode(8);
const node7 = new TreeNode(7);
node10.left = node5;
node10.right = node15;
node5.left = node1;
node5.right = node8;
node15.right = node7;

console.log(largestBSTSubtree(node10));

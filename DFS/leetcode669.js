// 669. Trim a Binary Search Tree
// Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.
// Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.
//
// Example 1:
// Input: root = [1,0,2], low = 1, high = 2
// Output: [1,null,2]
//
// Example 2:
// Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
// Output: [3,2,null,1]

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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function(root, low, high) {
	if (!root) return root;
		// 右子树
		if (root.val < low) {
			return trimBST(root.right, low, high);
		}
		// 左子树
		else if (root.val > high) {
			return trimBST(root.left, low, high);
		} else {
			root.left = trimBST(root.left, low, high);
			root.right = trimBST(root.right, low, high);
		}
	return root;
};



function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}

const node0 = new TreeNode(0);
const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
node3.left = node0;
node3.right = node4;
node0.right = node2;
node2.left = node1;

console.log(trimBST(node3, 1, 3));

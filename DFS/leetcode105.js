// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
//
// Example 1:
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
//
// Example 2:
// Input: preorder = [-1], inorder = [-1]
// Output: [-1]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}

var buildTree = function(preorder, inorder) {
	if (!inorder.length) return null;
	const allInOrder = inorder.reduce((acc, cur) => {
		acc[cur] = true;
		return acc;
	}, {});
	const firstPreOrder = preorder.find(item => allInOrder[item]);
	const root = new TreeNode(firstPreOrder);
	const rootIdx = inorder.indexOf(firstPreOrder);
	const leftInorder = inorder.slice(0, rootIdx);
	const rightInorder = inorder.slice(rootIdx + 1);

	const left = buildTree(preorder, leftInorder);
	const right = buildTree(preorder, rightInorder);
	root.left = left;
	root.right = right;
	return root;
};

console.log(JSON.stringify(buildTree([3,9,20,15,7], [9,3,15,20,7]),0,2));

// 285. Inorder Successor in BST
// Given the root of a binary search tree and a node p in it, return the in-order successor of that node in the BST.
// If the given node has no in-order successor in the tree, return null.
// The successor of a node p is the node with the smallest key greater than p.val.
//
// Example 1:
// Input: root = [2,1,3], p = 1
// Output: 2
// Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.
//
// Example 2:
// Input: root = [5,3,6,2,4,null,null,1], p = 6
// Output: null
// Explanation: There is no in-order successor of the current node, so the answer is null.
//
// Constraints:
// The number of nodes in the tree is in the range [1, 104].
// -105 <= Node.val <= 105
// All Nodes will have unique values.
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
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p) {
	let res = null;
	const dfs = (node, path = []) => {
		if (!node) return node;
		dfs(node.left, path);
		const val = node.val;
		if (path[path.length - 1] === p.val) {
			res = node;
		}
		path.push(val);
		dfs(node.right, path);
	}
	dfs(root);
	return res;
};


function TreeNode(val) {
	this.val = val;
	this.left = this.right = null;
}
const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
const node6 = new TreeNode(6);

node5.left = node3;
node5.right = node6;
node3.left = node2;
node3.right = node4;
node2.left = node1;

console.log(inorderSuccessor(node5, node6));

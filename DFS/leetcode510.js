// 510. Inorder Successor in BST II
// Given a node in a binary search tree, return the in-order successor of that node in the BST. If that node has no in-order successor, return null.
// The successor of a node is the node with the smallest key greater than node.val.
// You will have direct access to the node but not to the root of the tree. Each node will have a reference to its parent node. Below is the definition for Node:
//
// class Node {
// 	public int val;
// 	public Node left;
// 	public Node right;
// 	public Node parent;
// }
//
// Example 1:
// Input: tree = [2,1,3], node = 1
// Output: 2
// Explanation: 1's in-order successor node is 2. Note that both the node and the return value is of Node type.
//
// Example 2:
// Input: tree = [5,3,6,2,4,null,null,1], node = 6
// Output: null
// Explanation: There is no in-order successor of the current node, so the answer is null.

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function(node) {
	let root = node;
	while(root.parent) {
		root = root.parent;
	}
	let res = null;
	const dfs = (nd, path = []) => {
		if (!nd) return node;
		dfs(nd.left, path);
		const val = nd.val;
		if (path[path.length - 1] === node.val) {
			res = nd;
		}
		path.push(val);
		dfs(nd.right, path);
	}
	dfs(root);
	return res;
};


function _Node(val) {
	this.val = val;
	this.left = null;
	this.right = null;
	this.parent = null;
};
// const node1 = new _Node(1);
// const node2 = new _Node(2);
// const node3 = new _Node(3);
// const node4 = new _Node(4);
// const node5 = new _Node(5);
// const node6 = new _Node(6);
//
// node5.left = node3;
// node5.right = node6;
// node3.left = node2;
// node3.right = node4;
// node2.left = node1;
// node1.parent = node2;
// node2.parent = node3;
// node4.parent = node3;
// node3.parent = node5;
// node6.parent = node5;

const node1 = new _Node(1);
const node2 = new _Node(2);
const node3 = new _Node(3);

node2.left = node1;
node2.right = node3;
node1.parent = node2;
node3.parent = node2;

console.log(inorderSuccessor(node1));

// 1650. Lowest Common Ancestor of a Binary Tree III
// Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).
// Each node will have a reference to its parent node. The definition for Node is below:
//
// 	class Node {
// 		public int val;
// 		public Node left;
// 		public Node right;
// 		public Node parent;
// 	}
// According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."
//
// Example 1:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
//
// Example 2:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.
//
// Example 3:
// Input: root = [1,2], p = 1, q = 2
// Output: 1


/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

function _Node(val) {
	this.val = val;
	this.left = null;
	this.right = null;
	this.parent = null;
};

/**
 * @param {_Node} p
 * @param {_Node} q
 * @return {_Node}
 */
var lowestCommonAncestor = function(p, q) {
	const hashSet = new Set();
	while (p) {
		hashSet.add(p);
		p = p.parent;
	}
	while (q) {
		if (hashSet.has(q)) {
			return q;
		}
		q = q.parent;
	}
	return null;
};





const node3 = new _Node(3);
const node5 = new _Node(5);
const node6 = new _Node(6);
const node2 = new _Node(2);
const node0 = new _Node(0);
const node8 = new _Node(8);
const node9 = new _Node(9);
const node1 = new _Node(1);
const node7 = new _Node(7);
const node4 = new _Node(4);
node3.left = node5;
node3.right = node1;
node5.left = node6;
node5.right = node2;
node2.left = node7;
node2.right = node4;
node1.left = node0;
node1.right = node8;
node5.parent = node3;
node1.parent = node3;
node6.parent = node5;
node2.parent = node5;
node7.parent = node2;
node4.parent = node2;
node0.parent = node1;
node8.parent = node1;

console.log(lowestCommonAncestor(node5, node1));

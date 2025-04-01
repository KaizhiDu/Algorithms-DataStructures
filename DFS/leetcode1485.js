// 1485. Clone Binary Tree With Random Pointer
// A binary tree is given such that each node contains an additional random pointer which could point to any node in the tree or null.
// Return a deep copy of the tree.
// The tree is represented in the same input/output way as normal binary trees where each node is represented as a pair of [val, random_index] where:
// val: an integer representing Node.val
// random_index: the index of the node (in the input) where the random pointer points to, or null if it does not point to any node.
// You will be given the tree in class Node and you should return the cloned tree in class NodeCopy. NodeCopy class is just a clone of Node class with the same attributes and constructors.
//
// Example 1:
// Input: root = [[1,null],null,[4,3],[7,0]]
// Output: [[1,null],null,[4,3],[7,0]]
// Explanation: The original binary tree is [1,null,4,7].
// 	The random pointer of node one is null, so it is represented as [1, null].
// 	The random pointer of node 4 is node 7, so it is represented as [4, 3] where 3 is the index of node 7 in the array representing the tree.
// 	The random pointer of node 7 is node 1, so it is represented as [7, 0] where 0 is the index of node 1 in the array representing the tree.
//
// Example 2:
// Input: root = [[1,4],null,[1,0],null,[1,5],[1,5]]
// Output: [[1,4],null,[1,0],null,[1,5],[1,5]]
// Explanation: The random pointer of a node can be the node itself.
//
// Example 3:
// Input: root = [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]
// Output: [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]

/**
 * @param {TreeNode} root
 * @return {number}
 */

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, random) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.random = random === undefined ? null : random;
 * };
 */


function _Node(val, left, right, random) {
	this.val = val === undefined ? null : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
	this.random = random === undefined ? null : random;
};


/**
 * @param {_Node} root
 * @return {NodeCopy}
 */
var copyRandomBinaryTree = function(root) {
	if (!root) return null;

	// 哈希表用于存储原节点到新节点的映射
	const oldToNew = new Map();

	// 第一步：DFS 创建所有节点，不处理 random 指针
	function dfs(node) {
		if (!node) return null;
		if (oldToNew.has(node)) return oldToNew.get(node);

		// 创建一个新节点并记录到哈希表中
		const cloneNode = new Node(node.val);
		oldToNew.set(node, cloneNode);

		// 递归处理左右子树
		cloneNode.left = dfs(node.left);
		cloneNode.right = dfs(node.right);

		return cloneNode;
	}

	const newRoot = dfs(root);

	// 第二步：遍历哈希表，处理 random 指针的映射
	for (const [oldNode, newNode] of oldToNew.entries()) {
		if (oldNode.random) {
			newNode.random = oldToNew.get(oldNode.random);
		}
	}

	return newRoot;
};


// 构建所有节点
const node7 = new _Node(7);
const node4 = new _Node(4, node7, null);
const node1 = new _Node(1, null, node4);

// 设置 random 指针
node1.random = node4; // 1.random -> 4
node4.random = node1; // 4.random -> 1
node7.random = node4; // 7.random -> 4


console.log(copyRandomBinaryTree(node1));

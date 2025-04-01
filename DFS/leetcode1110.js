// 1110. Delete Nodes And Return Forest
// Given the root of a binary tree, each node in the tree has a distinct value.
// After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
// Return the roots of the trees in the remaining forest. You may return the result in any order.
//
// Example 1:
// Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
// Output: [[1,2,null,4],[6],[7]]
//
// Example 2:
// Input: root = [1,2,4,null,3], to_delete = [3]
// Output: [[1,2,4]]

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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
	const deleteMap = to_delete.reduce((acc, item)=> {
		acc[item] = true;
		return acc;
	}, {});
	const result = deleteMap[root.val] ? [] : [root];
	const dfs = node => {
		if (!node) return node;
		if (deleteMap[node.val]) {
			if (node.left && !deleteMap[node.left.val]) {
				result.push(node.left);
			}
			if (node.right && !deleteMap[node.right.val]) {
				result.push(node.right);
			}
		}
		dfs(node.left);
		dfs(node.right);
		if ((node.left && deleteMap[node.left.val])) {
			node.left = null;
		}
		if ((node.right && deleteMap[node.right.val])) {
			node.right = null;
		}
	}
	dfs(root);
	return result;
};


function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}


// 构建所有节点
const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
const node6 = new TreeNode(6);
const node7 = new TreeNode(7);


node1.left = node2;
node1.right = node3;
node2.left = node4;
node2.right = node5;
node3.left = node6;
node3.right = node7;

console.log(delNodes(node1, [3, 5]));

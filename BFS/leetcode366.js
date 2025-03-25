// 366. Find Leaves of Binary Tree
// Given the root of a binary tree, collect a tree's nodes as if you were doing this:
// Collect all the leaf nodes.
// Remove all the leaf nodes.
// Repeat until the tree is empty.
//
// Example 1:
// Input: root = [1,2,3,4,5]
// Output: [[4,5,3],[2],[1]]
// Explanation:
// [[3,5,4],[2],[1]] and [[3,4,5],[2],[1]] are also considered correct answers since per each level it does not matter the order on which elements are returned.
//
// Example 2:
// Input: root = [1]
// Output: [[1]]




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
 * @return {number[][]}
 */

function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}
// BFS 很麻烦
// var findLeaves = function(root) {
//
// 	const relationships = {};
// 	const stack = [root];
// 	const queue = [];
//
// 	while (stack.length) {
// 		const current = stack.pop();
// 		const { left, right, val } = current;
// 		if (left) {
// 			relationships[left.val] = {
// 				parent: current,
// 				child: 'left'
// 			}
// 			stack.push(left);
// 		}
// 		if (right) {
// 			relationships[right.val] = {
// 				parent: current,
// 				child: 'right'
// 			}
// 			stack.push(right);
// 		}
// 		if (!left && !right) {
// 			queue.push(val);
// 		}
// 	}
// 	const res = [];
// 	while (queue.length) {
// 		const queueLength = queue.length;
// 		const layerRes = [];
// 		for (let i = 0; i < queueLength; i++) {
// 			const current = queue.shift();
// 			layerRes.push(current);
// 			const relationship = relationships[current];
// 			if (relationship) {
// 				const { parent, child } = relationship;
// 				parent[child] = null;
// 				if (!parent.left && !parent.right) {
// 					queue.push(parent.val);
// 				}
// 			}
// 		}
// 		res.push(layerRes);
// 	}
// 	return res;
// };


// DFS 更优解！
const findLeaves = (root) => {
	const res = [];

	const dfs = (node) => {
		if (!node) return -1;

		const leftHeight = dfs(node.left);
		const rightHeight = dfs(node.right);
		const height = Math.max(leftHeight, rightHeight) + 1;

		if (!res[height]) res[height] = [];
		res[height].push(node.val);

		return height;
	};

	dfs(root);
	return res;
};

const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
node1.left = node2;
node1.right = node3;
node2.left = node4;
node2.right = node5;

console.log(findLeaves(node1));

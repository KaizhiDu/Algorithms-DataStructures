// 863. All Nodes Distance K in Binary Tree
// Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.
// You can return the answer in any order.
//
// Example 1:
//
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
// Output: [7,4,1]
// Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.
//
// Example 2:
// Input: root = [1], target = 1, k = 3
// Output: []


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function(root, target, k) {
	const graph = {};
	const targetVal = target.val;
	const dfs = (node) => {
		if (!node) return null;
		const val = node.val;
		if (!graph[val]) {
			graph[val] = [];
		}
		if (node.left) {
			const leftVal = node.left.val;
			if (!graph[leftVal]) {
				graph[leftVal] = [];
			}
			if (!graph[leftVal].find(each => each === val)) {
				graph[leftVal].push(val);
			}
			if (!graph[val].find(each => each === leftVal)) {
				graph[val].push(leftVal);
			}
		}
		if (node.right) {
			const rightVal = node.right.val;
			if (!graph[rightVal]) {
				graph[rightVal] = [];
			}
			if (!graph[rightVal].find(each => each === val)) {
				graph[rightVal].push(val);
			}
			if (!graph[val].find(each => each === rightVal)) {
				graph[val].push(rightVal);
			}
		}
		dfs(node.left);
		dfs(node.right);
	}
	dfs(root);
	const visited = {
		[targetVal]: true
	};
	const queue = [{val: targetVal, path: 0}];

	const result = [];

	while (queue.length) {
		const { path, val } = queue.shift();
		if (path === k) result.push(val); // 只在路径相等时加入结果
		const adjacencies = graph[val];
		for (const adjacency of adjacencies) {
			if (!visited[adjacency] && (path < k)) {
				const nextPath = path + 1;
				visited[adjacency] = true;
				queue.push({ val: adjacency, path: nextPath });
			}
		}
	}

	return result;

};



function TreeNode(val) {
	this.val = val;
	this.left = this.right = null;
}
// 构建所有节点
const node0 = new TreeNode(0);
const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
const node6 = new TreeNode(6);
const node7 = new TreeNode(7);
const node8 = new TreeNode(8);

node3.left = node5;
node3.right = node1;
node5.left = node6;
node5.right = node2;
node2.left = node7;
node2.right = node4;
node1.left = node0;
node1.right = node8;

console.log(distanceK(node3, node5, 2));

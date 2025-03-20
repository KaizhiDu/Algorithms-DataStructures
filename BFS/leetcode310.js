// 310. Minimum Height Trees
// A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
// Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).
// Return a list of all MHTs' root labels. You can return the answer in any order.
// The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.
//
// Example 1:
// Input: n = 4, edges = [[1,0],[1,2],[1,3]]
// Output: [1]
// Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
//
// Example 2:
// Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
// Output: [3,4]




/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function(n, edges) {
	if (n === 1) return [0];
	const inDegree = {};
	const graph = {};

	for (let i = 0; i < n; i++) {
		inDegree[i] = 0;
		graph[i] = [];
	}

	for (const [x, y] of edges) {
		inDegree[x] = inDegree[x] + 1;
		inDegree[y] = inDegree[y] + 1;
		graph[x].push(y);
		graph[y].push(x);
	}

	// BFS 函数
	const bfs = (start) => {
		const queue = [{ node: start, path: [start] }];
		const visited = {};
		visited[start] = true;

		let longestPath = [];
		while (queue.length) {
			const { node, path } = queue.shift();
			longestPath = path;

			for (const neighbor of graph[node]) {
				if (!visited[neighbor]) {
					visited[neighbor] = true;
					queue.push({ node: neighbor, path: [...path, neighbor] });
				}
			}
		}
		return longestPath;
	};

	// Step 1: 任意叶子节点出发，找到最长路径的一端
	const firstLeaf = Object.keys(inDegree).find(item => inDegree[item] === 1);
	const longestPathFromLeaf = bfs(firstLeaf);

	// Step 2: 从最长路径的一端出发，找到最长路径的另一端
	const longestPath = bfs(longestPathFromLeaf[longestPathFromLeaf.length - 1]);

	// Step 3: 取中点
	const mid = Math.floor(longestPath.length / 2);
	if (longestPath.length % 2 === 0) {
		return [longestPath[mid - 1], longestPath[mid]];
	} else {
		return [longestPath[mid]];
	}
};

console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]]));
// findMinHeightTrees(1, []);

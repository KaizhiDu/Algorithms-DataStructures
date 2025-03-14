// 323. Number of Connected Components in an Undirected Graph
// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.
// Return the number of connected components in the graph.
//
// Example 1:
// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2
//
// Example 2:
// Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
// Output: 1


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
	const adjacencyList = edges.reduce((acc, [start, end]) => {
		if (!acc[start]) acc[start] = [];
		if (!acc[end]) acc[end] = [];
		acc[start].push(end);
		acc[end].push(start);
		return acc;
	}, {});
	let current = 0;
	let result = 0;
	const visited = new Set();
	while (current < n) {
		if (!adjacencyList[current]) {
			current++;
			result++;
			continue;
		}
		if (!visited.has(current)) {
			result++;
			const queue = [current];
			while (queue.length) {
				const pop = queue.shift();
				visited.add(pop);
				for (const adjacency of adjacencyList[pop]) {
					if (!visited.has(adjacency)) {
						queue.push(adjacency);
					}
				}
			}
		}
		current++;
	}
	return result;
};

console.log(countComponents(4, [[2,3],[1,2],[1,3]]))

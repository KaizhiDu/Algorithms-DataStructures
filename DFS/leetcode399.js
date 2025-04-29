// 399. Evaluate Division
// You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.
// 	You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.
// Return the answers to all queries. If a single answer cannot be determined, return -1.0.
// 	Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.
// 	Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.
//
// Example 1:
// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation:
// 	Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
// note: x is undefined => -1.0


//
// Example 2:
// Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// Output: [3.75000,0.40000,5.00000,0.20000]
//
// Example 3:
// Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// Output: [0.50000,2.00000,-1.00000,-1.00000]

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
	const graph = {};
	for (let i = 0; i < equations.length; i++) {
		const equation = equations[i];
		const value = values[i];
		const [start, end] = equation || [];
		if (!graph[start]) graph[start] = [];
		if (!graph[end]) graph[end] = [];
		graph[start].push({ node: end, value });
		graph[end].push({ node: start, value: 1 / value });
	}

	const result = [];

	console.log(graph);


	const dfs = (start, end, visited) => {
		if (!graph[start]) return null;
		const adjacencies = graph[start];
		for (const adjacency of adjacencies) {
			const { node, value: adjVal } = adjacency || {};
			if (visited.has(node)) continue;
			if (node === end) {
				return adjVal;
			}
			visited.add(node);
			const nextVal = dfs(node, end, visited);
			visited.delete(node);
			if (nextVal !== null) {
				return adjVal * nextVal;
			}
		}
		return null; // 如果所有路径都走不通，返回null
	}

	for (const query of queries) {
		const [start, end] = query || [];
		const visited = new Set();
		visited.add(start);
		if (!graph[start] || !graph[end]) {
			result.push(-1);
		} else if (start === end) {
			result.push(1);
		} else {
			const val = dfs(start, end, visited);
			result.push(val === null ? -1.0 : val);
		}
	}

	return result;

};
// console.log(calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]));
console.log(calcEquation([["a","b"],["c","d"]], [1.0,1.0], [["a","c"],["b","d"],["b","a"],["d","c"]]));
// console.log(calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"]]));
// console.log(calcEquation([["a","aa"]], [9.0], [["aa","a"],["aa","aa"]]));

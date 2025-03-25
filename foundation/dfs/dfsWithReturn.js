function dfsWithReturn(graph, node) {
	if (!node) return 0; // 返回值的初始化值（如深度、数量、最大值等）

	let maxDepth = 0;  // 示例：记录最大深度
	for (let neighbor of graph[node]) {
		maxDepth = Math.max(maxDepth, dfsWithReturn(graph, neighbor));
	}

	return maxDepth + 1; // 返回深度 +1（当前节点）
}

const graph = {
	1: [2, 3],
	2: [4, 5],
	3: [6],
	4: [],
	5: [6],
	6: []
};

console.log(dfsWithReturn(graph, 1)); // 输出: 3 (最大深度)

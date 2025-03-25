function dfsWithPath(graph, node, target, path = []) {
	// 将当前节点加入路径
	path.push(node);

	// 如果找到目标，输出该路径
	if (node === target) {
		console.log("找到路径:", path);
	}

	// 遍历所有邻居
	for (let neighbor of graph[node]) {
		if (!path.includes(neighbor)) {
			dfsWithPath(graph, neighbor, target, path);
		}
	}

	// 回溯
	path.pop();
}

// 示例图（邻接表表示法）
const graph = {
	1: [2, 3],
	2: [4, 5],
	3: [6],
	4: [],
	5: [6],
	6: []
};

// 示例调用
dfsWithPath(graph, 1, 6);

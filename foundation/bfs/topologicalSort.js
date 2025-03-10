// BFS for Topological Sorting (Kahn’s Algorithm)
// 适用于：DAG Directed Acyclic Graph（有向无环图）中的排序问题
// 解题思路 (Kahn's Algorithm - BFS)
// Kahn's Algorithm 采用入度 (In-degree) 的概念来完成拓扑排序。

function topologicalSort(graph) {
    const inDegree = {};
    const queue = [];
    const result = [];

    // Initialize in-degree
    for (const node in graph) {
        inDegree[node] = 0;
    }
    for (const node in graph) {
        for (const neighbor of graph[node]) {
            inDegree[neighbor]++;
        }
    }

    // Add nodes with zero in-degree to the queue
    for (const node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        const adjacentNodes = graph[node];
        for (const node of adjacentNodes) {
            inDegree[node]--;
            if (inDegree[node] === 0) {
                queue.push(node);
            }
        }
    }

    return result;
}


//     A
//    / \
//   B   C
//   |   |
//   D   E
//   |
//   F

const graph = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['E'],
    D: [],
    E: ['F'],
    F: []
};

console.log(topologicalSort(graph));

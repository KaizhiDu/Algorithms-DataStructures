
// 遍历一个图 不记录层数（无深度需求）
const bfs = (graph, startNode) => {
    const queue = [startNode];
    const visited = new Set();
    const result = [];
    visited.add(startNode);
    while (queue.length) {
        const node = queue.shift();
        result.push(node);
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
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

console.log(bfs(graph, 'A'));

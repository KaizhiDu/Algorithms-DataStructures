// BFS With Tracking Levels (for Shortest Path or Layered Traversal)

function bfsShortestPath(graph, startNode, targetNode) {
    const queue = [[startNode, 0]]; // [Node, Level]
    const visited = new Set();
    visited.add(startNode);

    while (queue.length > 0) {
        const [node, level] = queue.shift();

        if (node === targetNode) {
            return level; // Return the shortest path length
        }

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                queue.push([neighbor, level + 1]); // Track levels
                visited.add(neighbor);
            }
        }
    }

    return -1; // Target node not found
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

console.log(bfsShortestPath(graph, 'A', 'F'));

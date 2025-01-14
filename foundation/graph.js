// 图与树的关系是？如何知道一个图是不是一课树？
// 判断流程
// 步骤 1：检查边的数量。如果边数不是 n - 1，直接返回“不是树”。
// 步骤 2：检查连通性。如果图不连通（存在孤立的节点或部分节点之间没有路径），则返回“不是树”。
// 步骤 3：检查环路。如果存在环路，则返回“不是树”。



class UndirectedGraph {
    constructor() {
        this.adjacencyList = {};  // 用对象来存储邻接表
    }

    // 添加顶点
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // 添加边（无向图）
    addEdge(v1, v2) {
        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            if (!this.adjacencyList[v1].find(vertex => vertex === v2)) {
                this.adjacencyList[v1].push(v2);
            }
            if (!this.adjacencyList[v2].find(vertex => vertex === v1)) {
                this.adjacencyList[v2].push(v1);  // 无向图，双向连接
            }
        }
    }

    graphDFSRecursion(vertex, visited = new Set()) {
        visited.add(vertex);
        for (const adjacencyVertex of this.adjacencyList[vertex]) {
            if (!visited.has(adjacencyVertex)) {
                this.graphDFSRecursion(adjacencyVertex, visited);
            }
        }
        return Array.from(visited);
    }

    graphDFSIterative(vertex) {
        const stack = [vertex];
        const visited = new Set();
        const result = [];
        while (stack.length) {
            const popVertex = stack.pop();
            if (!visited.has(popVertex)) {
                visited.add(popVertex);
                result.push(popVertex);
                for (const adjacency of this.adjacencyList[popVertex]) {
                    if (!visited.has(adjacency)) {
                        stack.push(adjacency);
                    }
                }
            }
        }
        return result;
    }

    graphBFS(vertex) {
        const visited = new Set();
        const queue = [vertex];
        const result = [];
        while (queue.length) {
            const popVertex = queue.shift();
            if (!visited.has(popVertex)) {
                visited.add(popVertex);
                result.push(popVertex);
            }
            for (const adjacency of this.adjacencyList[popVertex]) {
                if (!visited.has(adjacency)) {
                    queue.push(adjacency);
                }
            }
        }
        return result;
    }

}

//             (A)
//            /   \
//         (B)     (C)
//          |       |
//         (D)-----(E)
//                  |
//                 (F)

const undirectedGraph = new UndirectedGraph();
undirectedGraph.addVertex('A');
undirectedGraph.addVertex('B');
undirectedGraph.addVertex('C');
undirectedGraph.addVertex('D');
undirectedGraph.addVertex('E');
undirectedGraph.addVertex('F');
undirectedGraph.addEdge('A', 'B');
undirectedGraph.addEdge('A', 'C');
undirectedGraph.addEdge('B', 'D');
undirectedGraph.addEdge('C', 'E');
undirectedGraph.addEdge('D', 'E');
undirectedGraph.addEdge('E', 'F');

// console.log(undirectedGraph.graphDFSRecursion('A'))
// console.log(undirectedGraph.graphDFSIterative('A'))
console.log(undirectedGraph.graphBFS('A'))

class DirectedGraph {
    constructor() {
        this.adjacencyList = {};  // 用对象来存储邻接表
    }

    // 添加顶点
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // 添加边（有向图）
    addEdge(v1, v2) {
        if (
            this.adjacencyList[v1]
            && !this.adjacencyList[v1].find(vertex => vertex === v2)
            && !this.adjacencyList[v2].find(vertex => vertex === v1)
        ) {
            this.adjacencyList[v1].push(v2);
        }
    }
}

// const directedGraph = new DirectedGraph();
// directedGraph.addVertex('A');
// directedGraph.addVertex('B');
// directedGraph.addVertex('C');
// directedGraph.addEdge('A', 'B');
// directedGraph.addEdge('A', 'C');
// directedGraph.addEdge('C', 'A');
// directedGraph.addEdge('C', 'B');
// directedGraph.addEdge('B', 'C');
//
// console.log(directedGraph.adjacencyList)

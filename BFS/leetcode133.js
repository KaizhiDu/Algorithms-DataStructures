// 133. Clone Graph
// Given a reference of a node in a connected undirected graph.
// 	Return a deep copy (clone) of the graph.
// 	Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
//
// 	class Node {
// 	public int val;
// 	public List<Node> neighbors;
// }
//
//
// Test case format:
//
// 	For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
//
// 	An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
//
// 	The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.




/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */

function _Node(val, neighbors) {
	this.val = val === undefined ? 0 : val;
	this.neighbors = neighbors === undefined ? [] : neighbors;
};

var cloneGraph = function(node) {
	if (!node) return null;

	const visited = new Map();
	const queue = [node];
	const result = new _Node(node.val);
	visited.set(node.val, result);
	while (queue.length) {
		const pop = queue.shift();
		const cloneNode = visited.get(pop.val);
		for (const neighbor of pop.neighbors) {
			if (!visited.get(neighbor.val)) {
				queue.push(neighbor);
				visited.set(neighbor.val, new _Node(neighbor.val));
			}
			cloneNode.neighbors.push(visited.get(neighbor.val));
		}
	}
	return result;
};

const node1 = new _Node(1);
const node2 = new _Node(2);
const node3 = new _Node(3);
const node4 = new _Node(4);
node1.neighbors = [node2, node4];
node2.neighbors = [node1, node3];
node3.neighbors = [node2, node4];
node4.neighbors = [node1, node3];

console.log(cloneGraph(node1));

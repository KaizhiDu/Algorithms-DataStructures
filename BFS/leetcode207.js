// 207. Course Schedule
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.
//
// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// 	To take course 1 you should have finished course 0. So it is possible.
//
// Example 2:
// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// 	To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
	const inDegree = {};
	const graph = {};
	let result = 0;
	const queue = [];

	for (let i = 0; i < numCourses; i++) {
		inDegree[i] = 0;
		graph[i] = [];
	}

	for (const prerequisite of prerequisites) {
		const [course, preReq] = prerequisite;
		if (course === preReq) {
			return false;
		}
		inDegree[course] = inDegree[course] + 1;
		graph[preReq].push(course);
	}

	for (const inDegreeKey in inDegree) {
		const degree = inDegree[inDegreeKey];
		if (degree === 0) {
			queue.push(Number(inDegreeKey));
		}
	}

	while (queue.length > 0) {
		result++;
		const current = queue.shift();
		for (const adjacency of graph[current]) {
			if (inDegree[adjacency]) {
				inDegree[adjacency] = inDegree[adjacency] - 1;
				if (inDegree[adjacency] === 0) {
					queue.push(adjacency);
				}
			}
		}
	}

	return result === numCourses;
};

console.log(canFinish(2, [[1,0]]));

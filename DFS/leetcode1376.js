// 1376. Time Needed to Inform All Employees
// Hint
// A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.
// Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.
// The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.
// The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).
// Return the number of minutes needed to inform all the employees about the urgent news.
//
// Example 1:
// Input: n = 1, headID = 0, manager = [-1], informTime = [0]
// Output: 0
// Explanation: The head of the company is the only employee in the company.
//
// Example 2:
// Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
// Output: 1
// Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
// 	The tree structure of the employees in the company is shown.

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
	let informToHead;
	const graph = {};
	for (var i = 0; i < manager.length; i++) {
		const supervisor = manager[i];
		const infoTime = informTime[i];
		if (i === headID) {
			informToHead = infoTime;
		} else {
			if (!graph[supervisor]) graph[supervisor] = [];
			graph[supervisor].push({ member: i, infoTime });
		}
	}

	const dfs = (start, time) => {
		const members = graph[start];
		if (!members) return time;
		let maxPath = 0;

		for (const each of members) {
			const { member, infoTime } = each || {};
			const accumTime = time + dfs(member, infoTime);
			if (accumTime > maxPath) {
				maxPath = accumTime;
			}
		}
		return maxPath;
	}
	const res = dfs(headID, informToHead);
	return res;
};


// var numOfMinutes = function(n, headID, manager, informTime) {
// 	const graph = {};
//
// 	for (let i = 0; i < n; i++) {
// 		const supervisor = manager[i];
// 		if (supervisor !== -1) {
// 			if (!graph[supervisor]) graph[supervisor] = [];
// 			graph[supervisor].push(i);
// 		}
// 	}
//
// 	const dfs = (current, currentTime) => {
// 		if (!graph[current]) return currentTime;
//
// 		let maxTime = 0;
// 		for (const subordinate of graph[current]) {
// 			maxTime = Math.max(maxTime, dfs(subordinate, currentTime + informTime[current]));
// 		}
// 		return maxTime;
// 	};
//
// 	return dfs(headID, 0);
// };





console.log(numOfMinutes(10, 0, [-1,0,0,0,1,1,2,2,3,3], [3,2,2,3,1,2,3,4,5,6]));

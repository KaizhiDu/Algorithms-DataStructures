// 131. Palindrome Partitioning
// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return all possible palindrome partitioning of s.
//
// Example 1:
// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]
//
// Example 2:
// Input: s = "a"
// Output: [["a"]]
//
// Example 3:
// Input: s = "aaacab"
// Output: [
//   ["a", "a", "a", "c", "a", "b"],
//   ["a", "a", "aca", "b"],
//   ["a", "aa", "c", "a", "b"],
//   ["aa", "a", "c", "a", "b"],
//   ["aa", "aca", "b"],
//   ["aaa", "c", "a", "b"]
// ]

/**
 * @param {string} s
 * @return {string[][]}
 */

function isPalindrome(s, left, right) {
	while (left < right) {
		if (s[left] !== s[right]) return false;
		left++;
		right--;
	}
	return true;
}

// // wrong solution
// var partition = function(s) {
//
// 	const result = [];
//
// 	const dfs = (path, left, right) => {
// 		const isCurrentPalindrome = isPalindrome(s, left, right);
// 		const currentVal = s.slice(left, right + 1);
// 		if (!isCurrentPalindrome) return;
// 		path.push(currentVal);
// 		if (left === s.length - 1 || right === s.length - 1) {
// 			result.push([...path]);
// 			return;
// 		}
// 		for (let i = right + 1; i < s.length; i++) {
// 			dfs(path, right + 1, i);
// 		}
// 	}
//
// 	for (let i = 0; i < s.length; i++) {
// 		const left = s.slice(0, i + 1);
// 		const palindrome = isPalindrome(s, 0 ,i);
// 		console.log({
// 			palindrome,
// 			left,
// 			right: i
// 		})
// 		if (palindrome) {
// 			dfs([], 0, i);
// 		}
// 	}
// 	return result;
//
// };

var partition = function(s) {
	const result = [];

	const dfs = (start, path) => {
		if (start === s.length) {
			result.push([...path]); // copy current path
			return;
		}
		for (let end = start; end < s.length; end++) {
			if (isPalindrome(s, start, end)) {
				path.push(s.slice(start, end + 1));
				dfs(end + 1, path);
				path.pop(); // backtrack
			}
		}
	};

	dfs(0, []);
	return result;
};




console.log(partition('aaacab'));

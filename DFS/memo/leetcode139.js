// 139. Word Break
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
// 	Note that the same word in the dictionary may be reused multiple times in the segmentation.
//
// 	Example 1:
// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
//
// 	Example 2:
// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// 	Note that you are allowed to reuse a dictionary word.
//
// 	Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// var wordBreak = function(s, wordDict) {
// 	const wordSet = new Set(wordDict);
// 	const dfs = (idx) => {
// 		if (idx === s.length) return true;
// 		for (let i = idx; i < s.length; i++) {
// 			const word = s.slice(idx, i + 1);
// 			if (!wordSet.has(word)) continue;
// 			if (dfs(i + 1)) {
// 				return true;
// 			}
// 		}
// 		return false;
// 	}
// 	return dfs(0);
// };

var wordBreak = function(s, wordDict) {
	const wordSet = new Set(wordDict);
	const memo = new Map();

	const dfs = (idx) => {
		if (idx === s.length) return true;
		if (memo.has(idx)) return memo.get(idx);

		for (let i = idx; i < s.length; i++) {
			const word = s.slice(idx, i + 1);
			if (wordSet.has(word) && dfs(i + 1)) {
				memo.set(idx, true);
				return true;
			}
		}
		memo.set(idx, false);
		return false;
	};

	return dfs(0);
};



// console.log(wordBreak('leetcode', ['leet', 'code']));
console.log(wordBreak('applepenapple', ['apple', 'pen']));

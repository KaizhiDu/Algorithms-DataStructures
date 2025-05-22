// 72. Edit Distance
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
// 	You have the following three operations permitted on a word:
// 	Insert a character
// Delete a character
// Replace a character
//
// Example 1:
// Input: word1 = "horse", word2 = "ros"
// Output: 3
// Explanation:
// 	horse -> rorse (replace 'h' with 'r')
// 	rorse -> rose (remove 'r')
// rose -> ros (remove 'e')
//
// Example 2:
// Input: word1 = "intention", word2 = "execution"
// Output: 5
// Explanation:
// 	intention -> inention (remove 't')
//  inention -> enention (replace 'i' with 'e')
// 	enention -> exention (replace 'n' with 'x')
// 	exention -> exection (replace 'n' with 'c')
// 	exection -> execution (insert 'u')

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// var minDistance = function(word1, word2) {
//
// 	const remove = (word, idx) => {
// 		return word.slice(0, idx).concat(word.slice(idx + 1));
// 	}
// 	const insert = (word, idx, val) => {
// 		return word.slice(0, idx).concat(val).concat(word.slice(idx));
// 	}
// 	const replace = (word, idx, val) => {
// 		return word.slice(0, idx).concat(val).concat(word.slice(idx + 1));
// 	}
//
// 	const dfs = (word, count) => {
// 		if (word === word2) return count;
// 		for (let i = 0; i < word.length; i++) {
// 			if (word[i] === word2[i] || !word[i] || !word2[i]) continue;
// 			const afterInsert = insert(word, i, word2[i]);
// 			const afterRemove = remove(word, i);
// 			const afterReplace = replace(word, i, word2[i]);
// 			return Math.min(
// 				dfs(afterInsert, count + 1) || Infinity,
// 				dfs(afterRemove, count + 1) || Infinity,
// 				dfs(afterReplace, count + 1)) || Infinity
// 		}
//
// 	}
// 	return dfs(word1, 0);
// };


var minDistance = function(word1, word2) {
	const memo = new Map();
	const dfs = (i, j) => {
		const key = `${i}-${j}`;
		if (memo.has(key)) return memo.get(key);
		if (i === word1.length) return word2.length - j;
		if (j === word2.length) return word1.length - i;
		if (word1[i] === word2[j]) {
			const next = dfs(i + 1, j + 1);
			memo.set(key, next);
			return memo.get(key);
		} else {
			const afterInsert = dfs(i, j + 1) + 1;
			const afterRemove = dfs(i + 1, j) + 1;
			const afterReplace = dfs(i + 1, j + 1) + 1;
			const min = Math.min(afterInsert, afterRemove, afterReplace);
			memo.set(key, min);
			return memo.get(key);
		}
	}
	return dfs(0, 0);
}

console.log(minDistance('horse', 'ros'));

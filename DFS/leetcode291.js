// 291. Word Pattern II
// Given a pattern and a string s, return true if s matches the pattern.
// A string s matches a pattern if there is some bijective mapping of single characters to non-empty strings such that if each character in pattern is replaced by the string it maps to, then the resulting string is s. A bijective mapping means that no two characters map to the same string, and no character maps to two different strings.
//
// Example 1:
// Input: pattern = "abab", s = "redblueredblue"
// Output: true
// Explanation: One possible mapping is as follows:
// 	'a' -> "red"
// 'b' -> "blue"
//
// Example 2:
// Input: pattern = "aaaa", s = "asdasdasdasd"
// Output: true
// Explanation: One possible mapping is as follows:
// 	'a' -> "asd"
//
// Example 3:
// Input: pattern = "aabb", s = "xyzabcxzyabc"
// Output: false

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
function wordPatternMatch(pattern, s) {
	const map = new Map(); // patternChar -> word
	const used = new Set(); // word used

	function dfs(i, j) {
		if (i === pattern.length && j === s.length) return true;
		if (i === pattern.length || j === s.length) return false;

		const char = pattern[i];

		if (map.has(char)) {
			const word = map.get(char);
			if (!s.startsWith(word, j)) return false;
			return dfs(i + 1, j + word.length);
		}

		for (let k = j + 1; k <= s.length; k++) {
			const word = s.slice(j, k);
			if (used.has(word)) continue;

			map.set(char, word);
			used.add(word);

			if (dfs(i + 1, k)) return true;

			map.delete(char);
			used.delete(word);
		}

		return false;
	}

	return dfs(0, 0);
}

console.log(wordPatternMatch('aaaa', 'asdasdasdasd'));

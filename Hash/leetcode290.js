// 290. Word Pattern
// Given a pattern and a string s, find if s follows the same pattern.
// 	Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:
// Each letter in pattern maps to exactly one unique word in s.
// 	Each unique word in s maps to exactly one letter in pattern.
// 	No two letters map to the same word, and no two words map to the same letter.
//
// 	Example 1:
// Input: pattern = "abba", s = "dog cat cat dog"
// Output: true
// Explanation:
// 	The bijection can be established as:
// 	'a' maps to "dog".
// 'b' maps to "cat".
//
// 	Example 2:
// Input: pattern = "abba", s = "dog cat cat fish"
// Output: false
//
// Example 3:
// Input: pattern = "aaaa", s = "dog cat cat dog"
// Output: false


/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
	const words = s.split(' ');
	if (pattern.length !== words.length) return false;
	const map = new Map();
	const wordMap = new Map();
	let pass = true;
	for (let i = 0; i < words.length; i++) {
		const key = pattern[i];
		const word = words[i];
		if (!map.has(key)) {
			map.set(key, word);
			if (wordMap.has(word)) {
				pass = false;
				break;
			}
			wordMap.set(word, true);
		} else {
			const storeVal = map.get(key);
			if (storeVal !== word) {
				console.log({
					state: storeVal,
					word
				})
				pass = false;
				break;
			}
		}
	}
	return pass;
};

console.log(wordPattern('abba', "dog dog dog dog"));

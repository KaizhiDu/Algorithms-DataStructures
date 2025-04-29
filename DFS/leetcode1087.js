// 1087. Brace Expansion
// You are given a string s representing a list of words. Each letter in the word has one or more options.
// 	If there is one option, the letter is represented as is.
// 	If there is more than one option, then curly braces delimit the options. For example, "{a,b,c}" represents options ["a", "b", "c"].
// 	For example, if s = "a{b,c}", the first character is always 'a', but the second character can be 'b' or 'c'. The original list is ["ab", "ac"].
// 	Return all words that can be formed in this manner, sorted in lexicographical order.
//
// Example 1:
// Input: s = "{a,b}c{d,e}f"
// Output: ["acdf","acef","bcdf","bcef"]
//
// Example 2:
// Input: s = "abcd"
// Output: ["abcd"]

/**
 * @param {string} s
 * @return {string[]}
 */
var expand = function(s) {
	const result = []
	const dfs = (path, i) => {
		if (i === s.length) result.push(path);
		if (i > s.length) return null;
		if (s[i] === '{') {
			const braceItems = [];
			while (s[i] !== '}') {
				if (s[i] !== ',' && s[i] !== '{') {
					braceItems.push(s[i]);
				}
				i = i + 1;
			}
			for (const braceItem of braceItems) {
				dfs(path+braceItem, i + 1);
			}
		} else {
			dfs(path+s[i], i + 1);
		}
	}
	dfs('', 0);
	return result;
};

console.log(expand("{a,b}c{d,e}f"));

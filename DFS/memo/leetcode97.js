// 97. Interleaving String
// Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.
// An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that:
// s = s1 + s2 + ... + sn
// t = t1 + t2 + ... + tm
// |n - m| <= 1
// The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
// Note: a + b is the concatenation of strings a and b.
//
// Example 1:
// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
// Output: true
// Explanation: One way to obtain s3 is:
// 	Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
// 	Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
// 	Since s3 can be obtained by interleaving s1 and s2, we return true.
//
// Example 2:
// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
// Output: false
// Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
//
// Example 3:
// Input: s1 = "", s2 = "", s3 = ""
// Output: true

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
// var isInterleave = function(s1, s2, s3) {
// 	const dfs = (idx1, idx2, idx3) => {
// 		if (idx3 === s3.length || idx1 === s1.length || idx2 === s2.length) return true;
// 		if (idx3 > s3.length) return false;
// 		let result = false;
// 		for (let i = idx1; i < s1.length ; i++) {
// 			const a = s1.slice(idx1, i + 1);
// 			for (let j = idx2; j < s2.length ; j++) {
// 				const b = s2.slice(idx2, j + 1);
// 				const c = s3.slice(idx3, idx3 + a.length + b.length);
// 				if (c !== a + b) continue;
// 				const res = dfs(i + 1, j + 1, idx3 + a.length + b.length);
// 				if (res) {
// 					result = res;
// 				}
// 			}
// 		}
// 		return result;
// 	}
// 	return dfs(0, 0, 0);
// };
// console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'));

var isInterleave = function(s1, s2, s3) {
	if (s1.length + s2.length !== s3.length) return false;
	const memo = new Map();
	const dfs = (i, j) => {
		const k = i + j;
		if (k === s3.length) return true;
		const key = `${i}-${j}`;
		if (memo.has(key)) return memo.get(key);
		let check = false;
		if (i < s1.length && s1[i] === s3[k]) {
			check = dfs(i + 1, j);
		}
		if (!check && j < s2.length && s2[j] === s3[k]) {
			check = dfs(i, j + 1);
		}
		memo.set(key, check);
		return check;
	}
	return dfs(0, 0);
};

console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'));

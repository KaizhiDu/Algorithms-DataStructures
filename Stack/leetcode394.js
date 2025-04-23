// 394. Decode String
// Given an encoded string, return its decoded string.
// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].
// The test cases are generated so that the length of the output will never exceed 105.
//
// Example 1:
//
// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"
// Example 2:
//
// Input: s = "3[a2[c]]"
// Output: "accaccacc"
// Example 3:
//
// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"



/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
	let numStack = [];
	let strStack = [];
	let currentStr = "";
	let currentNum = 0;

	for (let char of s) {
		if (char >= '0' && char <= '9') {
			currentNum = currentNum * 10 + parseInt(char);  // 处理多位数
		} else if (char === '[') {
			numStack.push(currentNum);
			strStack.push(currentStr);
			currentNum = 0;
			currentStr = "";
		} else if (char === ']') {
			let repeatTimes = numStack.pop();
			let lastStr = strStack.pop();
			currentStr = lastStr + currentStr.repeat(repeatTimes);
		} else {
			currentStr += char;
		}
	}
	return currentStr;
};//
// console.log(decodeString('3[a]2[bc]'));
// console.log(decodeString('3[a2[c]]'));
// console.log(decodeString('2[abc]3[cd]ef'));
console.log(decodeString('abc3[cd]100[yz]'));
// console.log(decodeString('100[leetcode]'));

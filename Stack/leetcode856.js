// 856. Score of Parentheses
// Given a balanced parentheses string s, return the score of the string.
// 	The score of a balanced parentheses string is based on the following rule:
// 	"()" has score 1.
// AB has score A + B, where A and B are balanced parentheses strings.
// (A) has score 2 * A, where A is a balanced parentheses string.
//
// Example 1:
// Input: s = "()"
// Output: 1
//
// Example 2:
// Input: s = "(())"
// Output: 2
//
// Example 3:
// Input: s = "()()"
// Output: 2

// Input: "(()(()))"
// Output: 6
// 解释：
// - 外面是 (A)，所以是 2 * A
// - A = () + (())，也就是 1 + 2 = 3
// 	- 所以总分是 2 * 3 = 6
//
//
// Constraints:
//
// 	2 <= s.length <= 50
// s consists of only '(' and ')'.
// 	s is a balanced parentheses string.

/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function(s) {
	const stack = [];

	for (let i = 0; i < s.length; i++) {
		const currentItem = s[i];
		const prevItem = s[i - 1];
		if (currentItem === '(') {
			stack.push(currentItem);
		}
		if (currentItem === ')') {
			if (prevItem === '(') {
				stack.pop();
				stack.push(1);
			} else {
				let total = 0;
				let value = stack.pop();
				total = value;
				while (value !== '(') {
					value = stack.pop();
					if (!isNaN(value)) {
						total = total + value;
					}
				}
				stack.push(2 * total);
			}
		}
	}

	return stack.reduce((a, b) => a + b, 0);
};

console.log(scoreOfParentheses('()()'));

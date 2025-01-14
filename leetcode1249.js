// leetcode 1249 Minimum Remove to Make Valid Parentheses

// Given a string s of '(' , ')' and lowercase English characters.
// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.
// Formally, a parentheses string is valid if and only if:
// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.
//
// Example 1:
// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
//
// Example 2:
// Input: s = "a)b(c)d"
// Output: "ab(c)d"
//
// Example 3:
// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.

const minRemoveToMakeValid = (s) => {
    let left = 0;
    const stack = [];
    for (const each of s) {
        if (each === '(') {
            stack.push(each);
            left++;
        } else if (each === ')') {
            if (left !== 0) {
                left--;
                stack.push(each);
            }
        } else {
            stack.push(each);
        }
    }

    let result = '';

    if (!!left) {
        for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i] === '(' && left > 0) {
                left--;
            } else {
                result = `${stack[i]}${result}`
            }
        }
    } else {
        return stack.join('');
    }
    return result;
}



console.log(minRemoveToMakeValid('))(('));

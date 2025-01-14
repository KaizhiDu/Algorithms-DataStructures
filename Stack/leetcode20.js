// leetcode 20
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
//
//     An input string is valid if:
//
// Open brackets must be closed by the same type of brackets.
//     Open brackets must be closed in the correct order.
//     Every close bracket has a corresponding open bracket of the same type.
// Example 1:
// Input: s = "()"
// Output: true
// Example 2:
// Input: s = "()[]{}"
// Output: true
// Example 3:
// Input: s = "(]"
// Output: false
// Example 4:
// Input: s = "([])"
// Output: true


var isValid = function(s) {

    const stack = [];
    for (var i = 0; i < s.length; i++) {
        const item = s[i];
        if (item === '(' || item === '[' || item === '{') {
            stack.push(item);
        }
        if (item === ')') {
            if (stack[stack.length - 1] === '(') {
                stack.pop();
            } else {
                if (!stack.length) {
                    stack.push(item);
                } else {
                    break;
                }
            }
        }
        if (item === ']') {
            if (stack[stack.length - 1] === '[') {
                stack.pop();
            } else {
                if (!stack.length) {
                    stack.push(item);
                } else {
                    break;
                }
            }
        }

        if (item === '}') {
            if (stack[stack.length - 1] === '{') {
                stack.pop();
            } else {
                if (!stack.length) {
                    stack.push(item);
                } else {
                    break;
                }
            }
        }
    }
    return !stack.length;
}


console.log(isValid('()[(}]{}'));

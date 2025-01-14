// leetcode 224 Basic Calculator
// Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.
//Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
//
//Example 1:
// Input: s = "1 + 1"
// Output: 2
//
// Example 2:
// Input: s = " 2-1 + 2 "
// Output: 3
//
// Example 3:
// Input: s = "(1+(4+5+2)-3)+(6+8)"
// Output: 23

const cal = (first, second, operation) => {
    if (operation === '+') {
        return first + second;
    }
    return first - second;
}


function calculate(s) {
    const stack = [];
    let currentResult = 0; // 当前的计算结果
    let sign = 1; // 当前符号，1 表示正，-1 表示负

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char >= '0' && char <= '9') {
            // 直接将数字加入结果
            currentResult += sign * parseInt(char, 10);
        } else if (char === '+') {
            sign = 1; // 更新为正号
        } else if (char === '-') {
            sign = -1; // 更新为负号
        } else if (char === '(') {
            // 遇到括号，保存当前状态
            stack.push(currentResult);
            stack.push(sign);
            currentResult = 0; // 重置当前结果
            sign = 1; // 重置符号
        } else if (char === ')') {
            // 处理括号内结果
            currentResult *= stack.pop(); // 栈顶是括号前的符号
            currentResult += stack.pop(); // 再次弹出栈顶是括号前的结果
        }
    }

    return currentResult;
}

console.log(calculate('(1+(4+5+2)-3)+(6+8)'));

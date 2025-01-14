// leetcode 150 Evaluate Reverse polish notation
// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.
//
//     Evaluate the expression. Return an integer that represents the value of the expression.
//
//     Note that:
//
//     The valid operators are '+', '-', '*', and '/'.
//     Each operand may be an integer or another expression.
//     The division between two integers always truncates toward zero.
//     There will not be any division by zero.
//     The input represents a valid arithmetic expression in a reverse polish notation.
//     The answer and all the intermediate calculations can be represented in a 32-bit integer.
//
// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

const evalRPN = (tokens) => {
    const stack = [];
    for (const token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseInt(token));
        } else {
            const secondNumber = stack.pop();
            const firstNumber = stack.pop();
            if (token === '+') {
                stack.push(firstNumber + secondNumber);
            }
            if (token === '-') {
                stack.push(firstNumber - secondNumber);
            }
            if (token === '*') {
                stack.push(firstNumber * secondNumber);
            }
            if (token === '/') {
                stack.push(firstNumber / secondNumber);
            }
        }
    }
    return stack[0];
}


console.log(evalRPN(["2","1","+","3","*"]))

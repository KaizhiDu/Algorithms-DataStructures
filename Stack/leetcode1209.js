// leetcode 1209 Remove All Adjacent Duplicates in String II

// You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them, causing the left and the right side of the deleted substring to concatenate together.
// We repeatedly make k duplicate removals on s until we no longer can.
// Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.
//
// Example 1:
// Input: s = "abcd", k = 2
// Output: "abcd"
// Explanation: There's nothing to delete.
//
// Example 2:
// Input: s = "deeedbbcccbdaa", k = 3
// Output: "aa"
// Explanation:
//     First delete "eee" and "ccc", get "ddbbbdaa"
// Then delete "bbb", get "dddaa"
// Finally delete "ddd", get "aa"
//
// Example 3:
// Input: s = "pbbcggttciiippooaais", k = 2
// Output: "ps"

const removeDuplicates = (s, k) => {
    const stack = [];
    for (const item of s) {
        let count = k - 1;
        let check = true;
       while (count > 0) {
           if (!stack[stack.length - count] || stack[stack.length - count] !== item) {
               check = false;
                break;
           }
           count--;
       }
       if (check) {
           let popTime = k - 1;
           while (popTime > 0) {
               stack.pop();
               popTime--;
           }
       } else {
           stack.push(item);
       }
    }
    return stack.join('');
}

// function removeDuplicates(s, k) {
//     const stack = [];
//
//     for (const char of s) {
//         if (stack.length > 0 && stack[stack.length - 1][0] === char) {
//             // 如果栈顶字符相同，增加计数
//             stack[stack.length - 1][1]++;
//             if (stack[stack.length - 1][1] === k) {
//                 // 如果计数达到 k，移除栈顶元素
//                 stack.pop();
//             }
//         } else {
//             // 如果栈顶字符不同，入栈
//             stack.push([char, 1]);
//         }
//     }
//
//     // 重建最终字符串
//     return stack.map(([char, count]) => char.repeat(count)).join('');
// }


console.log(removeDuplicates('pbbcggttciiippooaais', 2));

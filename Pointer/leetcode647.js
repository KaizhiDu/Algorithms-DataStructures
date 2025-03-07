// 647. Palindromic Substrings
// Given a string s, return the number of palindromic substrings in it.
//     A string is a palindrome when it reads the same backward as forward.
//     A substring is a contiguous sequence of characters within the string.
//
//     Example 1:
// Input: s = "abc"
// Output: 3
// Explanation: Three palindromic strings: "a", "b", "c".
//
//     Example 2:
//
// Input: s = "aaa"
// Output: 6
// Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
//
//
//     Constraints:
// 1 <= s.length <= 1000
// s consists of lowercase English letters.


/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    const countPalindrome = (left, right) => {
        let count = 1;
        while (s[left] === s[right]) {
            if (left - 1 < 0) {
                break;
            }
            if (right + 1 > s.length - 1) {
                break;
            }
            if (s[left - 1] !== s[right + 1]) {
                break;
            }
            left--;
            right++;
            count++;
        }
        return count;
    }
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        const current = s[i];
        const next = s[i + 1];
        const isEven = current === next;
        const odd = countPalindrome(i, i);
        const even = isEven ? countPalindrome(i, i + 1) : 0;
        count = odd + even + count;
    }
    return count;
};


console.log(countSubstrings('aaa'));

// 1062. Longest Repeating Substring
// Given a string s, return the length of the longest repeating substrings. If no repeating substring exists, return 0.
// Example 1:
//
// Input: s = "abcd"
// Output: 0
// Explanation: There is no repeating substring.
//     Example 2:
//
// Input: s = "abbaba"
// Output: 2
// Explanation: The longest repeating substrings are "ab" and "ba", each of which occurs twice.
//     Example 3:
//
// Input: s = "aabcaabdaab"
// Output: 3
// Explanation: The longest repeating substring is "aab", which occurs 3 times.

/**
 * @param {string} s
 * @return {number}
 */


var longestRepeatingSubstring = function(s) {
    let left = 0;
    let right = s.length - 1;

    function search(len) {
        const seen = new Set();
        for(let i = 0; i < s.length - len; i++) {
            const str = s.substring(i, i+len+1);
            if(seen.has(str)) {
                return true;
            }
            seen.add(str);
        }
        return false;
    }

    while (left <= right) {
        const mid = Math.floor((right + left) / 2);
        if (search(mid)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
};

console.log(longestRepeatingSubstring('aabcaabdaab'));

// 5. Longest Palindromic Substring
// Given a string s, return the longest palindromic substring in s.
//
//     Example 1:
//
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
//
//     Example 2:
//
// Input: s = "cbbd"
// Output: "bb"


/**
 * @param {string} s
 * @return {string}
 */


var longestPalindrome = function(s) {

    const getPalindrome = (left, right) => {
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
        }
        return s.substring(left, right + 1);
    }

    let idx = 0;
    let max = ''
    while (idx < s.length) {
        const isEven = s[idx + 1] === s[idx]
        const oddRes = getPalindrome(idx, idx);
        const evenRes = isEven ? getPalindrome(idx, idx + 1) : oddRes;
        const palindrome = oddRes.length > evenRes.length ? oddRes : evenRes;
        if (palindrome.length > max.length) {
            max = palindrome;
        }
        idx++;
    }
    return max;
};


console.log(longestPalindrome('babad'));


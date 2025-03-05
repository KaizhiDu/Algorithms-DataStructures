// 409. Longest Palindrome
// Companies
// Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
//  Letters are case sensitive, for example, "Aa" is not considered a palindrome.
//
// Example 1:
// Input: s = "abccccdd"
// Output: 7
// Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
//
// Example 2:
// Input: s = "a"
// Output: 1
// Explanation: The longest palindrome that can be built is "a", whose length is 1.

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    const map = new Map();
    for (const item of s) {
        if (map.has(item)) {
            map.set(item, map.get(item) + 1);
        } else {
            map.set(item, 1);
        }
    }
    const array = Array.from(map);
    let acc = 0;
    let hasOdd = false;
    for (const item of array) {
        const [_, value] = item;
        if (value % 2 === 0) {
            acc = acc + value;
        } else {
            hasOdd = true;
            acc = acc + Math.floor(value / 2) * 2;
        }
    }
    return hasOdd ? acc + 1 : acc;
};

console.log(longestPalindrome('abccccdd'));

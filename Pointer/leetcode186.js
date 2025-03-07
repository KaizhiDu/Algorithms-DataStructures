// 186. Reverse Words in a String II
// Given a character array s, reverse the order of the words.
//
// A word is defined as a sequence of non-space characters. The words in s will be separated by a single space.
//
// Your code must solve the problem in-place, i.e. without allocating extra space.
//
//
// Example 1:
// Input: s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
// Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
//
// Example 2:
// Input: s = ["a"]
// Output: ["a"]

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

var reverseWords = function(s) {
    const reverse = (left, right) => {
        while (left < right) {
            [s[left], s[right]] = [s[right], s[left]];
            left++;
            right--;
        }
    }

    let left = 0;
    let right = s.length - 1;
    reverse(left, right);

    let partLeft = 0;
    for (let i = 0; i <= s.length; i++) {
        if (i === s.length || s[i] === ' ') {
            reverse(partLeft, i - 1);
            partLeft = i + 1;
        }
    }
};


console.log(reverseWords(["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]));

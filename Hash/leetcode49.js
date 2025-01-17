// 49. Group Anagrams
// Given an array of strings strs, group the
// anagrams
// together. You can return the answer in any order.
//
// Example 1:
//
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
//
// Explanation:
//
//     There is no string in strs that can be rearranged to form "bat".
//     The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
//     The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

var groupAnagrams = function(strs) {
    const map = new Map();
    for (const str of strs) {
        const count = new Array(26).fill(0);
        for (const each of str) {
            count[each.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        const key = count.join('-');
        if (map.has(key)) {
            const keyElement = map.get(key);
            keyElement.push(str);
            map.set(key, keyElement);
        } else {
            map.set(key, [str]);
        }
    }
    const result = [];
    for (const [_, value] of map) {
        result.push(value);
    }
    return result;
}


console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// console.log(groupAnagrams(["a"]));
// console.log(groupAnagrams([""]));

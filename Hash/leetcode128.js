// 128. Longest Consecutive Sequence
// Topics
// Companies
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
//     You must write an algorithm that runs in O(n) time.
//
// Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
//
// Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9


var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;

    const set = new Set();

    for (const num of nums) {
        set.add(num);
    }

    let longest = 0;

    for (const number of nums) {
        let num = number;
        // 如果set 里面没有 num - 1 就是起点
        if (!set.has(num - 1)) {
            let length = 0;
            while (set.has(num)) {
                length++;
                num++;
            }
            longest = Math.max(longest, length);
        }
    }

    return longest;

}


console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]))

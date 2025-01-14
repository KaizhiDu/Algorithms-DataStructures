// 179. Largest Number

// Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
// Since the result may be very large, so you need to return a string instead of an integer.
//
//Example 1:
// Input: nums = [10,2]
// Output: "210"
//
// Example 2:
// Input: nums = [3,30,34,5,9]
// Output: "9534330"
//
// Example 3:
// Input: nums = [10,2,9,39,17]
// Output: "93921710"


const largestNumber = nums => {
    nums = nums.map(String);

    nums.sort((a, b) => (b + a > a + b ? 1 : -1));

    const result = nums.join('');

    // 如果结果是以 "0" 开头，返回 "0"（避免 "000" 这种情况）
    return result[0] === '0' ? '0' : result;
};


console.log(largestNumber([10,2,9,39,17]));
















// 75. Sort Colors

// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
// You must solve this problem without using the library's sort function.
//
// Example 1:
// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]
//
// Example 2:
// Input: nums = [2,0,1]
// Output: [0,1,2]


const sortColors = nums => {
    if (nums.length === 0 || nums.length === 1) return nums;

    let current = 0;
    let left = 0;
    let right = nums.length - 1;
    while (current <= right) {
        const val = nums[current];
        if (val === 0) {
            [nums[current], nums[left]] = [nums[left], nums[current]];
            left = left + 1;
            current = current + 1;
        }
        if (val === 2) {
            [nums[current], nums[right]] = [nums[right], nums[current]];
            right = right - 1;
        }
        if (val === 1) {
            current = current + 1;
        }
    }

    return nums;
};


console.log(sortColors([2,0,2,1,1,0,1,2,1,2,1,0,1,1,1]));
















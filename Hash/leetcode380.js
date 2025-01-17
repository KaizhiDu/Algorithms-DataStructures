// 380. Insert Delete GetRandom O(1)
//
// RandomizedSet() Initializes the RandomizedSet object.
//     bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
//     bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
//     int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
// You must implement the functions of the class such that each function works in average O(1) time complexity.
//
// Example 1:
// Input
//     ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
//     [[], [1], [2], [2], [], [1], [2], []]
// Output
//     [null, true, false, true, 2, true, false, 2]
//
// Explanation
// RandomizedSet randomizedSet = new RandomizedSet();
// randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
// randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
// randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
// randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
// randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
// randomizedSet.insert(2); // 2 was already in the set, so return false.
// randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

var RandomizedSet = function() {
    this.map = new Map();
    this.nums = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) return false;

    this.map.set(val, this.nums.length); // 记录值和索引
    this.nums.push(val); // 添加值到数组
    return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) return false;

    const idx = this.map.get(val); // 获取值的索引
    const last = this.nums[this.nums.length - 1]; // 数组最后一个元素

    // 用最后一个元素覆盖被删除的元素
    this.nums[idx] = last;
    this.map.set(last, idx);

    // 移除最后一个元素
    this.nums.pop();
    this.map.delete(val);

    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const randomIdx = Math.floor(Math.random() * this.nums.length); // 随机生成索引
    return this.nums[randomIdx];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

const randomizedSet = new RandomizedSet();
console.log(randomizedSet.insert(1)); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
console.log(randomizedSet.remove(2)); // Returns false as 2 does not exist in the set.
console.log(randomizedSet.insert(2)); // Inserts 2 to the set, returns true. Set now contains [1,2].
console.log(randomizedSet.getRandom()); // getRandom() should return either 1 or 2 randomly.
console.log(randomizedSet.remove(1)); // Removes 1 from the set, returns true. Set now contains [2].
console.log(randomizedSet.insert(2)); // 2 was already in the set, so return false.
console.log(randomizedSet.getRandom()); // Since 2 is the only number in the set, getRandom() will always return 2.

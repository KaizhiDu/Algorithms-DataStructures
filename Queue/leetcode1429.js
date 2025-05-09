// 1429. First Unique Number

// You have a queue of integers, you need to retrieve the first unique integer in the queue.
//     Implement the FirstUnique class:
// FirstUnique(int[] nums) Initializes the object with the numbers in the queue.
//     int showFirstUnique() returns the value of the first unique integer of the queue, and returns -1 if there is no such integer.
//     void add(int value) insert value to the queue.
//
//     Example 1:
// Input:
//     ["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]
//         [[[2,3,5]],[],[5],[],[2],[],[3],[]]
// Output:
//     [null,2,null,2,null,3,null,-1]
// Explanation:
//     FirstUnique firstUnique = new FirstUnique([2,3,5]);
// firstUnique.showFirstUnique(); // return 2
// firstUnique.add(5);            // the queue is now [2,3,5,5]
// firstUnique.showFirstUnique(); // return 2
// firstUnique.add(2);            // the queue is now [2,3,5,5,2]
// firstUnique.showFirstUnique(); // return 3
// firstUnique.add(3);            // the queue is now [2,3,5,5,2,3]
// firstUnique.showFirstUnique(); // return -1
//
// Example 2:
// Input:
//     ["FirstUnique","showFirstUnique","add","add","add","add","add","showFirstUnique"]
//         [[[7,7,7,7,7,7]],[],[7],[3],[3],[7],[17],[]]
// Output:
//     [null,-1,null,null,null,null,null,17]
// Explanation:
//     FirstUnique firstUnique = new FirstUnique([7,7,7,7,7,7]);
// firstUnique.showFirstUnique(); // return -1
// firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7]
// firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3]
// firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3,3]
// firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7,3,3,7]
// firstUnique.add(17);           // the queue is now [7,7,7,7,7,7,7,3,3,7,17]
// firstUnique.showFirstUnique(); // return 17
//
// Example 3:
// Input:
//     ["FirstUnique","showFirstUnique","add","showFirstUnique"]
//         [[[809]],[],[809],[]]
// Output:
//     [null,809,null,-1]
// Explanation:
//     FirstUnique firstUnique = new FirstUnique([809]);
// firstUnique.showFirstUnique(); // return 809
// firstUnique.add(809);          // the queue is now [809,809]
// firstUnique.showFirstUnique(); // return -1

/**
 * @param {number[]} nums
 */

var FirstUnique = function(nums) {
    this.unique = new Set();
    this.visited = new Set();

    for (const num of nums) {
        if (!this.visited.has(num)) {
            if (!this.unique.has(num)) {
                this.unique.add(num);
            } else {
                this.unique.delete(num);
                this.visited.add(num);
            }
        }
    }

};

/**
 * @return {number}
 */
FirstUnique.prototype.showFirstUnique = function() {
    return Array.from(this.unique)[0] ? Array.from(this.unique)[0] : -1;
};

/**
 * @param {number} value
 * @return {void}
 */
FirstUnique.prototype.add = function(value) {
    if (!this.visited.has(value)) {
        if (!this.unique.has(value)) {
            this.unique.add(value);
        } else {
            this.unique.delete(value);
            this.visited.add(value);
        }
    }
};

/**
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */

const firstUnique = new FirstUnique([2,3,5]);
console.log(firstUnique.showFirstUnique()); // return 2
firstUnique.add(5);            // the queue is now [2,3,5,5]
console.log(firstUnique.showFirstUnique()); // return 2
firstUnique.add(2);            // the queue is now [2,3,5,5,2]
console.log(firstUnique.showFirstUnique()); // return 3
firstUnique.add(3);            // the queue is now [2,3,5,5,2,3]
console.log(firstUnique.showFirstUnique()); // return -1

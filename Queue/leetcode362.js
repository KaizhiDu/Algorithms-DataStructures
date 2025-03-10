// leetcode 362 design hit counter
// Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).
// Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.
// Implement the HitCounter class:
// HitCounter() Initializes the object of the hit counter system.
//     void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
//     int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).

// Example 1:
// Input
//     ["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
//     [[], [1], [2], [3], [4], [300], [300], [301]]
// Output
//     [null, null, null, null, 3, null, 4, 3]
//
// Explanation
// HitCounter hitCounter = new HitCounter();
// hitCounter.hit(1);       // hit at timestamp 1.
// hitCounter.hit(2);       // hit at timestamp 2.
// hitCounter.hit(3);       // hit at timestamp 3.
// hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
// hitCounter.hit(300);     // hit at timestamp 300.
// hitCounter.getHits(300); // get hits at timestamp 300, return 4.
// hitCounter.getHits(301); // get hits at timestamp 301, return 3.

var HitCounter = function() {
    this.TIME = 300;
    this.hits = [];
};

/**
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function(timestamp) {
    this.hits.push(timestamp);


};

/**
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function(timestamp) {
    while (this.hits.length > 0 && this.hits[0] <= timestamp - this.TIME) {
        this.hits.shift();
    }
    return this.hits.length;

};

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */



const hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.
hitCounter.hit(2);       // hit at timestamp 2.
hitCounter.hit(3);       // hit at timestamp 3.
console.log(hitCounter.getHits(4));   // get hits at timestamp 4, return 3.
hitCounter.hit(300);     // hit at timestamp 300.
console.log(hitCounter.getHits(300)); // get hits at timestamp 300, return 4.
console.log(hitCounter.getHits(301)); // get hits at timestamp 301, return 3.

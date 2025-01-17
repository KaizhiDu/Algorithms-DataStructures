// leetcode146 LRU Cache
//
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
//     Implement the LRUCache class:
// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
//     int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
//     The functions get and put must each run in O(1) average time complexity.
//
// Example 1:
// Input
//     ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//     [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
//     [null, null, null, 1, null, -1, null, -1, 3, 4]
//
// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

// 这个题 需要结合双向链表 和 哈希map

class Node {
    constructor(key, val, prev, next) {
        this.key = key;
        this.value = val;
        this.prev = prev || null;
        this.next = next || null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node('HEAD');
    this.tail = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const hitNode = this.map.get(key);
    if (!hitNode) return -1;
    if (hitNode !== this.tail) {
        const prevNode = hitNode.prev;
        const nextNode = hitNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        hitNode.prev = this.tail;
        this.tail.next = hitNode;
        this.tail = hitNode;
    }
    return hitNode.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    const newNode = new Node(key, value);
    if (this.map.size === this.capacity) {
        const needToRemove = this.head.next;
        const next = needToRemove.next;
        next.prev = this.head;
        this.head.next = next;
        this.map.delete(needToRemove.key);
    }
    this.map.set(key, newNode);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
console.log(lRUCache.get(1));    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
console.log(lRUCache.get(2));    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
console.log(lRUCache.get(1));    // return -1 (not found)
console.log(lRUCache.get(3));    // return 3
console.log(lRUCache.get(4));    // return 4

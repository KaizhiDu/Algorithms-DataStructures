// 692. Top K Frequent Words
// Given an array of strings words and an integer k, return the k most frequent strings.
// Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.
//
// Example 1:
// Input: words = ["i","love","leetcode","i","love","coding"], k = 2
// Output: ["i","love"]
// Explanation: "i" and "love" are the two most frequent words.
//     Note that "i" comes before "love" due to a lower alphabetical order.
//
// Example 2:
// Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
// Output: ["the","is","sunny","day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.

class Heap {
    constructor() {
        this.heap = [];
    }

    swap (idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] =  [this.heap[idx2], this.heap[idx1]]
    }

    add (val) {
        this.heap.push(val);
        this.heapUp();
    }

    heapUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx].val < this.heap[idx].val) {
                this.swap(idx, parentIdx);
                idx = parentIdx;
            } else {
                break;
            }
        }
    }

    pop () {
        if (this.heap.length === 0) return null; // 堆为空时返回 null
        this.swap(0, this.heap.length - 1);
        const popVal = this.heap.pop();
        this.heapDown()
        return popVal;
    }

    heapDown () {
        let idx = 0;
        const length = this.heap.length;
        while (true) {
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let largestIdx = idx;
            if (left < length && this.heap[largestIdx].val < this.heap[left].val) {
                largestIdx = left;
            }
            if (right < length && this.heap[largestIdx].val < this.heap[right].val) {
                largestIdx = right;
            }
            if (idx === largestIdx) {
                break;
            }
            this.swap(idx, largestIdx);
            idx = largestIdx;
        }
    }
}

var topKFrequent = function(words, k) {
    const map = new Map();
    for (const word of words) {
        map.set(word, (map.get(word) || 0) + 1);
    }

    const heap = new Heap();
    for (const mapElement of map) {
        const [key, val] = mapElement;
        heap.add({
            key,
            val
        });
    }

    const result = [];
    while(k) {
        result.push(heap.pop().key);
        k--;
    }

    return result;

}

console.log(topKFrequent(["the","day","is","sunny","the","the","the","sunny","is","is"], 4));

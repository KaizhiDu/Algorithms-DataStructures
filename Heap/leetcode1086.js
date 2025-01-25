// leetcode 1086 high five
// Given a list of the scores of different students, items, where items[i] = [IDi, scorei] represents one score from a student with IDi, calculate each student's top five average.
// Return the answer as an array of pairs result, where result[j] = [IDj, topFiveAveragej] represents the student with IDj and their top five average. Sort result by IDj in increasing order.
// A student's top five average is calculated by taking the sum of their top five scores and dividing it by 5 using integer division.
//
//
// Example 1:
//
// Input: items = [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]
// Output: [[1,87],[2,88]]
// Explanation:
//     The student with ID = 1 got scores 91, 92, 60, 65, 87, and 100. Their top five average is (100 + 92 + 91 + 87 + 65) / 5 = 87.
// The student with ID = 2 got scores 93, 97, 77, 100, and 76. Their top five average is (100 + 97 + 93 + 77 + 76) / 5 = 88.6, but with integer division their average converts to 88.
// Example 2:
//
// Input: items = [[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100]]
// Output: [[1,100],[7,100]]

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
            if (this.heap[parentIdx] < this.heap[idx]) {
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
            if (left < length && this.heap[largestIdx] < this.heap[left]) {
                largestIdx = left;
            }
            if (right < length && this.heap[largestIdx] < this.heap[right]) {
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



var highFive = function(items) {
    const map = new Map();

    for (const item of items) {
        const [key, val] = item;
        if (!map.has(key)) {
            const heap = new Heap();
            heap.add(val);
            map.set(key, heap);
        } else {
            const existHeap = map.get(key);
            existHeap.add(val);
        }
    }


    const result = [];
    for (const mapElement of map) {
        const [key, val] = mapElement;
        let count = 5;
        let sum = 0;
        while (count) {
            sum += val.pop();
            count--;
        }
        result.push([key, Math.floor(sum / 5)]);
    }
    return result;
}


console.log(highFive([[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]));

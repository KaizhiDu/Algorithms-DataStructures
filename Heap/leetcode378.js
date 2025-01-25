// 378. Kth Smallest Element in a Sorted Matrix
// Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.
// Note that it is the kth smallest element in the sorted order, not the kth distinct element.
// You must find a solution with a memory complexity better than O(n2).
//
// Example 1:
// Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
// Output: 13
// Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13
//
// Example 2:
// Input: matrix = [[-5]], k = 1
// Output: -5

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
            if (this.heap[parentIdx] > this.heap[idx]) {
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
            let minIdx = idx;
            if (left < length && this.heap[minIdx] > this.heap[left]) {
                minIdx = left;
            }
            if (right < length && this.heap[minIdx] > this.heap[right]) {
                minIdx = right;
            }
            if (idx === minIdx) {
                break;
            }
            this.swap(idx, minIdx);
            idx = minIdx;
        }
    }
}

var kthSmallest = function(matrix, k) {
    const heap = new Heap();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            heap.add(matrix[i][j]);
        }
    }
    let result;
    while (k) {
        result = heap.pop();
        k--;
    }
    return result;
};

console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8));

// 347. Top K Frequent Elements
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
//
// Example 1:
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
//
// Example 2:
// Input: nums = [1], k = 1
// Output: [1]
//
// Constraints:
//     1 <= nums.length <= 105
//     -104 <= nums[i] <= 104
// k is in the range [1, the number of unique elements in the array].
// It is guaranteed that the answer is unique.
// Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.


class Heap {
    constructor() {
        this.heap = [];
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    heapUp() {
        let needToHeapIdx = this.heap.length - 1;
        while (needToHeapIdx > 0) {
            const parentIdx = Math.floor((needToHeapIdx - 1) / 2);
            if (this.heap[needToHeapIdx] > this.heap[parentIdx]) {
                this.swap(parentIdx, needToHeapIdx);
                needToHeapIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    heapDown() {
        let needToHeapIdx = 0;
        const size = this.heap.length;
        while (true) {
            const left = needToHeapIdx * 2 + 1;
            const right = needToHeapIdx * 2 + 2;
            let largest = needToHeapIdx;
            // 比较左子节点
            if (left < size && this.heap[left] > this.heap[largest]) {
                largest = left;
            }
            // 比较右子节点
            if (right < size && this.heap[right] > this.heap[largest]) {
                largest = right;
            }
            // 如果当前节点已是最大值，停止调整
            if (largest === needToHeapIdx) {
                break;
            }
            // 交换并继续下沉
            this.swap(needToHeapIdx, largest);
            needToHeapIdx = largest;
        }

    }

    add(val) {
        this.heap.push(val);
        this.heapUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        this.swap(0, this.heap.length - 1);
        const value = this.heap.pop()
        this.heapDown()
        return value;
    }

}


var kFrequent = function(nums, k) {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    const heap = new Heap();
    for (const mapElement of map) {
        const [key, val] = mapElement || [];
        heap.add(val);
    }
    const result = [];
    while(k) {
        result.push(map.get(heap.pop()));
        k--;
    }
    return result;
}


console.log(kFrequent([1,1,1,2,2,3], 2));

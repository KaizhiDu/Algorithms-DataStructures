// 88. Merge Sorted Array
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
// Merge nums1 and nums2 into a single array sorted in non-decreasing order.
// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
//
// Example 1:
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
//     The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
//
// Example 2:
// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
//     The result of the merge is [1].
//
// Example 3:
// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
//     The result of the merge is [1].
//     Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

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




var merge = function(nums1, m, nums2, n) {
    let needToPop = m+n;
    const heap = new Heap();
        while (m) {
            heap.add(nums1[m-1]);
            m--;
        }
        while (n) {
            heap.add(nums2[n-1]);
            n--;
        }

    const result = [];
    while (needToPop) {
        result.push(heap.pop());
        needToPop--;
    }
    return result;
}


console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3))

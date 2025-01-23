// 973. K Closest Points to Origin
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

//Example 1:
// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
//     The distance between (1, 3) and the origin is sqrt(10).
//     The distance between (-2, 2) and the origin is sqrt(8).
//     Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
//     We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
//
//     Example 2:
// Input: points = [[3,3],[5,-1],[-2,4]], k = 2
// Output: [[3,3],[-2,4]]
// Explanation: The answer [[-2,4],[3,3]] would also be accepted.


class Heap {
    constructor() {
        this.heap = [];
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    heapUp() {
        let needToHeapIdx = this.heap.length - 1;
        while (needToHeapIdx >= 0) {
            const parentIdx = Math.ceil(needToHeapIdx / 2) - 1;
            if (this.heap[needToHeapIdx] < this.heap[parentIdx]) {
                this.swap(parentIdx, needToHeapIdx);
                needToHeapIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    heapDown() {
        let needToHeapIdx = 0;
        while (needToHeapIdx <= this.heap.length - 1) {
            const left = needToHeapIdx * 2 + 1;
            const right = needToHeapIdx * 2 + 2;
            if (this.heap[needToHeapIdx] > this.heap[left]) {
                this.swap(needToHeapIdx, left);
                needToHeapIdx = left;
            } else if (this.heap[needToHeapIdx] > this.heap[right]) {
                this.swap(needToHeapIdx, right);
                needToHeapIdx = right;
            } else {
                break;
            }
        }

    }

    add(val) {
        this.heap.push(val);
        this.heapUp();
    }

    pop() {
        this.swap(0, this.heap.length - 1);
        const value = this.heap.pop()
        this.heapDown()
        return value;
    }

}


var kClosest = function(points, k) {
    const heap = new Heap();
    const map = new Map();
    for (const point of points) {
        const [first, second] = point;
        const value = first*first + second*second;
        map.set(value, point);
        heap.add(value);
    }
    const result = [];
    while (k) {
        result.push(map.get(heap.pop()));
        k--;
    }
    return result
}


console.log(kClosest([[3,3],[5,-1],[-2,4], [1,1]], 2));

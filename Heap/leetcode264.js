class MinHeap {
    constructor() {
        this.heap = [];
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    heapUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parent]) {
                this.swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }

    heapDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }

            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest === index) {
                break;
            }

            this.swap(index, smallest);
            index = smallest;
        }
    }

    add(val) {
        this.heap.push(val);
        this.heapUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        this.swap(0, this.heap.length - 1);
        const popped = this.heap.pop();
        this.heapDown();
        return popped;
    }
}

var nthUglyNumber = function(n) {
    const heap = new MinHeap();
    const uglyNumbers = new Set();

    heap.add(1);
    uglyNumbers.add(1);

    let ugly = 1;

    for (let i = 1; i <= n; i++) {
        ugly = heap.pop(); // 取出堆中最小的丑数

        // 生成新的丑数
        for (const factor of [2, 3, 5]) {
            const nextUgly = ugly * factor;
            if (!uglyNumbers.has(nextUgly)) {
                uglyNumbers.add(nextUgly);
                heap.add(nextUgly);
            }
        }
    }
    console.log(uglyNumbers);
    console.log(heap);
    return ugly;
};

// 测试
console.log(nthUglyNumber(10)); // 输出 12
console.log(nthUglyNumber(4));  // 输出 4

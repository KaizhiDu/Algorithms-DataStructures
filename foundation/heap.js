class MaxHeap {
    constructor() {
        this.heap = [];
    }

    add(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let idx = this.heap.length - 1;
        const current = this.heap[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];
            if (current <= parent) {
                break;
            }
            this.heap[idx] = parent;
            this.heap[parentIdx] = current;
            idx = parentIdx;
        }
    }

    pop() {
        if (!this.heap.length) {
            return 'empty heap';
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return top;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    heapifyDown() {
        let currentIdx = 0;
        while (currentIdx < this.heap.length - 1) {
            const leftIdx = currentIdx * 2 + 1;
            const rightIdx = currentIdx * 2 + 2;
            const left = this.heap[leftIdx];
            const right = this.heap[rightIdx];
            const current = this.heap[currentIdx];
            if (!left && !right) {
                break;
            }
            let needToSwapIdx;
            if (!left) {
                needToSwapIdx = rightIdx;
            }else if (!right) {
                needToSwapIdx = leftIdx;
            } else {
                needToSwapIdx = left > right ? leftIdx : rightIdx;
            }
            const temp = this.heap[needToSwapIdx];
            if (current > temp) {
                break;
            }
            this.swap(needToSwapIdx, currentIdx);
            currentIdx = needToSwapIdx;
        }
    }
}

const maxHeap = new MaxHeap();

maxHeap.add(3);
maxHeap.add(2);
maxHeap.add(1);
maxHeap.add(100);
maxHeap.add(12);
maxHeap.add(4);
maxHeap.add(1000);
maxHeap.add(2000);
maxHeap.add(2001);
maxHeap.add(2003);
maxHeap.add(2004);
console.log(maxHeap.heap);
console.log('----------------------------');
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());

// 148. Sort List

// Given the head of a linked list, return the list after sorting it in ascending order.

// Input: head = [4,2,1,3]
// Output: [1,2,3,4]
// Input: head = [-1,5,3,4,0]
// Output: [-1,0,3,4,5]
// Input: head = []
// Output: []

class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const a = new ListNode(2);
const b = new ListNode(6);
const c = new ListNode(34);
const d = new ListNode(1);
const e = new ListNode(4);
const f = new ListNode(22);
const g = new ListNode(3);

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;

const merge = (left, right) => {
    let dummy = new ListNode('DUMMY');
    let tail = dummy;
    while (left && right) {
        if (left.value < right.value) {
            tail.next = left;
            left = left.next;
        } else {
            tail.next = right;
            right = right.next;
        }
        tail = tail.next;
    }

    if (left) {
        tail.next = left;
    }
    if (right) {
        tail.next = right;
    }

    return dummy.next;
}

const sortList = head => {
    const current = head;

    if (!current.next) {
        return current
    }

    let slow = current;
    let fast = !current.next ? null : current.next.next;

    while (fast) {
        slow = slow.next;
        fast = !fast.next ? null : fast.next.next;
    }

    const left = head;
    const right = slow.next;
    slow.next = null;

   return merge(sortList(left), sortList(right))
}


console.log(JSON.stringify(sortList(a),0,2));
















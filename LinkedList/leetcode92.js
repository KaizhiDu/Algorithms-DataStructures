// 92. Reverse Linked List II
// Given the head of a singly linked list and two integers left and right where left <= right,
// reverse the nodes of the list from position left to position right, and return the reversed list.
//
// Input: head = [1,2,3,4,5], left = 2, right = 4
// Output: [1,4,3,2,5]
//
// Input: head = [5], left = 1, right = 1
// Output: [5]

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const reverseList = (head, prev = null) => {
    if (head.next === null) {
        head.next = prev;
        return head;
    }
    const next = head.next;
    head.next = prev;
    return reverseList(next, head);
}

const reverseBetween = (head, left, right) => {
    if (left === right) {
        return head;
    }
    const start = head;
    let one;
    let two;
    let three;
    let idx = 1;
    while (head.next !== null) {
        if (idx === left && !one) {
            one = null;
            two = head;
            head = head.next;
        } else if (idx + 1 === left) {
            one = head;
            two = head.next;
            head = head.next;
            one.next = null;
        } else if (idx === right) {
            three = head.next;
            head.next = null;
        } else {
            head = head.next
        }
        idx += 1;
    }

    const revert = reverseList(two);
    if (one) {
        one.next = revert;
    }

    let current = revert;
    while (current.next) {
        current = current.next;
    }
    current.next = three;

    if (!one) {
        return revert;
    }
    return start;
}

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
const e = new Node(5);
a.next = b;
b.next = c;
c.next = d;
d.next = e;



console.log(JSON.stringify(reverseBetween(a,2,3),0,2));

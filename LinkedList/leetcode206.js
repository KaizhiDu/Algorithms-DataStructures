// 206. Reverse Linked List
//
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
//
// Input: head = [1,2]
// Output: [2,1]

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

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
const e = new Node(5);
a.next = b;
b.next = c;
c.next = d;
d.next = e;


console.log(JSON.stringify(reverseList(a),0,2));

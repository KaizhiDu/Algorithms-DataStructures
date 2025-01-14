// 876. Middle of the Linked List
// Input: head = [1,2,3,4,5]
// Output: [3,4,5]
// Explanation: The middle node of the list is node 3.
//
// Input: head = [1,2,3,4,5,6]
// Output: [4,5,6]
// Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
const e = new Node(5);
const f = new Node(6);
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;


const middleNode = head => {
    let slow = head;
    let fast = head;
    while (slow.next && fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    if (fast.next && !fast.next.next) {
        slow = slow.next;
    }
    return slow;
}

const res = middleNode(a);

console.log(res);

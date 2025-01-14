// 141. Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
// Return true if there is a cycle in the linked list. Otherwise, return false.
//
// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
//
// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const linedListCycle = head => {
    let slow = head;
    let fast = head;
    if (!head) {
        return false;
    }
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false
}

const a = new Node(3);
const b = new Node(2);
const c = new Node(0);
const d = new Node(-4);
a.next = b;
b.next = c;
c.next = d;
d.next = b;


console.log(JSON.stringify(linedListCycle(a),0,2));

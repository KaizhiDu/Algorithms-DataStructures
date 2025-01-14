class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // 在链表头部添加元素
    addAtHead(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    // 在链表尾部添加元素
    addAtTail(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // 遍历链表
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    // 查找元素是否存在
    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

    // 删除指定值的节点
    delete(value) {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    reverse(head, prev = null) {
        if (head.next === null) {
            head.next = prev;
            return head;
        }
        const next = head.next;
        head.next = prev;
        return this.reverse(next, head);
    }

}

// 使用示例
const list = new LinkedList();
list.addAtHead(1);
list.addAtTail(2);
list.addAtTail(3);
list.traverse(); // 输出 1, 2, 3
console.log(list.contains(2)); // true
list.delete(2);
console.log(list.head);
console.log(list.reverse(list.head));

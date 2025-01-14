class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }
            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    // 层序遍历：从上到下、从左到右逐层访问节点。              1, 2, 3, 4, 5, 6, 7, 8, 9
    levelOrderTraversal() {
        const result = [];
        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.value);
            if (current.left) {
                queue.push(current.left);
            }
            if (current.right) {
                queue.push(current.right);
            }
        }
        return result;
    }

    // 前序遍历：先访问根节点，再访问左子树，最后访问右子树。    1, 2, 4, 8, 9, 5, 3, 6, 7
    preOrderTraversal(node = this.root, result = []) {
        if (node) {
            result.push(node.value);
        }
        if (node.left) this.preOrderTraversal(node.left, result);
        if (node.right) this.preOrderTraversal(node.right, result);
        if (node === this.root) return result;
    }

    // 中序遍历：先访问左子树，再访问根节点，最后访问右子树。    8, 4, 9, 2, 5, 1, 6, 3, 7
    midOrderTraversal(node = this.root, result = []) {
        if (node.left) this.midOrderTraversal(node.left, result);
        if (node) {
            result.push(node.value);
        }
        if (node.right) this.midOrderTraversal(node.right, result);
        if (node === this.root) return result;
    }

    // 后序遍历：先访问左子树，再访问右子树，最后访问根节点。    8, 9, 4, 5, 2, 6, 7, 3, 1
    postOrderTraversal(node = this.root, result = []) {
        if (node.left) this.postOrderTraversal(node.left, result);
        if (node.right) this.postOrderTraversal(node.right, result);
        if (node) {
            result.push(node.value);
        }
        if (node === this.root) return result;
    }

    isBST() {
        const midOrderTraversal = this.midOrderTraversal();
        for (let i = 1; i < midOrderTraversal.length; i++) {
            if (midOrderTraversal[i] <= midOrderTraversal[i-1]) {
                return false;
            }
        }
        return true;
    }

    midTraversalSetValue(node = this.root, idx = 0, values) {
        if (!node) {
            return idx;
        }
        idx = this.midTraversalSetValue(node.left, idx, values)
        node.value = values[idx];
        idx++;
        idx = this.midTraversalSetValue(node.right, idx, values)
        return idx;
    }

    convertToBST() {
        const midOrderTraversal = this.midOrderTraversal();
        const afterSort = midOrderTraversal.sort((a, b) => a - b);
        this.midTraversalSetValue(this.root, 0, afterSort);
    }



}

const binaryTree = new BinaryTree();
binaryTree.insert(1);
binaryTree.insert(2);
binaryTree.insert(3);
binaryTree.insert(4);
binaryTree.insert(5);
binaryTree.insert(6);
binaryTree.insert(7);
binaryTree.insert(8);
binaryTree.insert(9);


// if (!binaryTree.isBST()) {
//     binaryTree.convertToBST();
// }
//
// console.log(binaryTree.isBST());
// console.log(binaryTree.levelOrderTraversal());






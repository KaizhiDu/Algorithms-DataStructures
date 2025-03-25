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
		while (queue.length) {
			const current = queue.shift();
			if (!current.left) {
				current.left = newNode;
				return;
			} else {
				queue.push(current.left);
			}
			if (!current.right) {
				current.right = newNode;
				return;
			} else {
				queue.push(current.right);
			}
		}
	}

	// 层序遍历：从上到下、从左到右逐层访问节点。              1, 2, 3, 4, 5, 6, 7, 8, 9
	levelOrder() {
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
	preOrder(node = this.root, result = []) {
		result.push(node.value);
		if (!node.left && !node.right) {
			return null;
		}
		if (node.left) {
			this.preOrder(node.left, result);
		}
		if (node.right) {
			this.preOrder(node.right, result);
		}
		return result;
	}

	// 中序遍历：先访问左子树，再访问根节点，最后访问右子树。    8, 4, 9, 2, 5, 1, 6, 3, 7
	midOrder(node = this.root, result = []) {
		if (node.left) {
			this.midOrder(node.left, result);
		}
		result.push(node.value);

		if (node.right) {
			this.midOrder(node.right, result);
		}
		if (!node.left && !node.right) {
			return null;
		}
		return result;
	}

	// 后序遍历：先访问左子树，再访问右子树，最后访问根节点。    8, 9, 4, 5, 2, 6, 7, 3, 1
	postOrder(node = this.root, result = []) {
		if (node.left) {
			this.postOrder(node.left, result);
		}
		if (node.right) {
			this.postOrder(node.right, result);
		}
		result.push(node.value);
		if (!node.left && !node.right) {
			return null;
		}
		return result;
	}
}







const tree = new BinaryTree();
console.log(JSON.stringify(tree, 0, 2));

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);
tree.insert(8);
tree.insert(9);
// console.log(tree.levelOrder());
// console.log(tree.preOrder());
// console.log(tree.midOrder());
console.log(tree.postOrder());

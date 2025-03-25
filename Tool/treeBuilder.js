class TreeNode {
	constructor(value) {
		this.val = value;
		this.left = null;
		this.right = null;
	}
}

class BinaryTree {
	constructor() {
		this.root = null;
	}
	insert(value) {
		const newNode = value ? new TreeNode(value) : null;
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
}



const treeBuilder = (values) => {
	const binaryTree = new BinaryTree();
	for (const value of values) {
		binaryTree.insert(value);
	}
	return binaryTree;
}

module.exports = treeBuilder;

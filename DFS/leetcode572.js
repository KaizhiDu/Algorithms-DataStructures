// 572. Subtree of Another Tree
// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.
// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.
//
// Example 1:
// Input: root = [3,4,5,1,2], subRoot = [4,1,2]
// Output: true
//
// Example 2:
// Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
// Output: false

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */

function TreeNode(val, left, right) {
	this.val = (val===undefined ? 0 : val)
	this.left = (left===undefined ? null : left)
	this.right = (right===undefined ? null : right)
}



var isSubtree = function(root, subRoot) {
	const checkSame = (node1, node2) => {
		if (!node1 && !node2) {
			return true;
		}
		if (!node1 || !node2) {
			return false;
		}
		if (node1.val !== node2.val) {
			return false;
		}
		const left = checkSame(node1.left, node2.left);
		const right = checkSame(node1.right, node2.right);
		return left && right;
	}

	const traverse = (node) => {
		if (!node) return false;
		if (checkSame(node, subRoot)) return true;
		return traverse(node.left) || traverse(node.right);
	}

	return traverse(root);
};

// 构建所有节点
const root1 = new TreeNode(1);
const root2 = new TreeNode(2);
const root3 = new TreeNode(3);
const root4 = new TreeNode(4);
const root5 = new TreeNode(5);
const subRoot1 = new TreeNode(1);
const subRoot2 = new TreeNode(2);
const subRoot4 = new TreeNode(4);

root3.left = root4;
root3.right = root5;
root4.left = root1;
root4.right = root2;
subRoot4.left = subRoot1;
subRoot4.right = subRoot2;

console.log(isSubtree(root3, subRoot4));

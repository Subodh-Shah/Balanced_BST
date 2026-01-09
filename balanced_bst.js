console.log("Working Properly!");

class Node {
	constructor(value = null, left = null, right = null ){
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(array) {
		this.root = balanced_BST_Maker(array);
		this.height = this.getHeight();
	}
	
	isBalanced() {
		function check_height(node) {
			if(node === null) return 0;
			let left_h = check_height(node.left);
			if(left_h === false) return false;
			let right_h = check_height(node.right);
			if(right_h === false) return false;
			if(Math.abs(left_h - right_h) > 1) return false;
			return Math.max(left_h, right_h) + 1;
		}
		return check_height(this.root) !== false;
	}
}

function balanced_BST_Maker(array) {
	let arrayLength = array.length;
	if (array.length === 0) return null;
	if (array.length === 1) return new Node(array[0]);
	let rootIndex = Math.floor(arrayLength / 2);
	let root = array[rootIndex];
	let leftSubTree = balanced_BST_Maker(array.slice(0, rootIndex));
	let rightSubTree = balanced_BST_Maker(array.slice(rootIndex + 1, arrayLength));
	let balancedBST = new Node(root, leftSubTree, rightSubTree);
	return balancedBST;
}

let array1 = [1, 2, 3, 4, 5];
console.log(balanced_BST_Maker(array1));

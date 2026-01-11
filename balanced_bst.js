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
	
	reBalance() {
		let balanced = this.isBalanced();
		if(balanced) return;
		let treeArray = this.inOrder();
		let root = balanced_BST_Maker(treeArray);
		this.root = root;
		return this;
	}
	
	findNode(value) {
		function find(node) {
			if(node === null) return null; // Not Found
			if(node.value === value) return node;
			if(node.value > value) return find(node.left);
			else return find (node.right);
		}
		return find(this.root);
	}
	
	// Breadth First Traversal
	levelOrderForEach(callback) {
		if(typeof callback !== "function") {
				throw new Error("Callback should be a Function Data Type");
		}
		
		if(this.root === null) {
			return;
		}
		let queue = [];
		let result = [];
		queue.push(this.root);
		while(queue.length > 0) {
			let current_node = queue.shift();
			callback(current_node);
			result.push(current_node);
			if(current_node.left !== null) queue.push(current_node.left);
			if(current_node.right !== null) queue.push(current_node.right);
		}
		return result;
	}
	
	preOrderForEach(callback) {
		if(typeof callback !== "function") {
				throw new Error("Callback should be a Function Data Type");
		}
		function traverse(node) {
			if(node === null) return;
			callback(node);
			traverse(node.left);
			traverse(node.right);
		}
		traverse(this.root);
	}
	
	postOrderForEach(callback) {
		if(typeof callback !== "function") {
				throw new Error("Callback should be a Function Data Type");
		}
		function traverse(node) {
			if(node === null) return;
			traverse(node.left);
			traverse(node.right);
			callback(node);
		}
		traverse(this.root);
	}
	
	inOrderForEach(callback) {
		if(typeof callback !== "function") {
				throw new Error("Callback should be a Function Data Type");
		}
		let result = [];
		function traverse(node) {
			if(node === null) return;
			traverse(node.left);
			callback(node);
			result.push(node.value); //Cause it can give sorted tree array
			traverse(node.right);
		}
		traverse(this.root);
		return result;
	}
	
	height(value) {
		let equal_node = this.findNode(value);
		if(equal_node === null) return -1;
		function height_tracker(node) {
			if(node === null) return -1;
			let left_h = height_tracker(node.left);
			let right_h = height_tracker(node.right);
			return 1 + Math.max(left_h, right_h);
		}
		return height_tracker(equal_node);
	}
	
	depth(value) {
		function depth_tracker(node, currentDepth = 0) {
			if(node === null) return -1;
			if (node.value === value) return currentDepth;
			if (node.value > value) {
				return depth_tracker(node.left, currentDepth + 1);
			}
			if(node.value < value) {
				return depth_tracker(node.right, currentDepth + 1);
			}
		}
		
		return depth_tracker(this.root);
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
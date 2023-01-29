import Node from './Node.js';

export default class Tree {
  #root = null;

  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort();
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  get root() {
    return this.#root;
  }

  set root(node) {
    this.#root = node;
  }

  buildTree(sortedArr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(sortedArr[mid]);
    root.left = this.buildTree(sortedArr, start, mid - 1);
    root.right = this.buildTree(sortedArr, mid + 1, end);

    return root;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

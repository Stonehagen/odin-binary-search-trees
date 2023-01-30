/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import Node from './Node.js';

export default class Tree {
  #root = null;

  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
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

  insert(newData, node = this.root) {
    if (newData <= node.data) {
      if (node.left === null) {
        node.left = new Node(newData);
        return;
      }
      this.insert(newData, node.left);
    } else {
      if (node.right === null) {
        node.right = new Node(newData);
        return;
      }
      this.insert(newData, node.right);
    }
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

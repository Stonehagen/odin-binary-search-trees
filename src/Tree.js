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

  insert(data, node = this.root) {
    if (data <= node.data) {
      if (node.left === null) {
        node.left = new Node(data);
        return;
      }
      this.insert(data, node.left);
    } else {
      if (node.right === null) {
        node.right = new Node(data);
        return;
      }
      this.insert(data, node.right);
    }
  }

  delete(data) {
    const delNode = this.find(data);
    const prevNode = this.findPrev(data);
    if (delNode === null) {
      return false;
    }
    if (this.findPrev(data) === 'root') {
      // Node is root Node
    }
    if (delNode.left === null && delNode.right === null) {
      if (prevNode.left === null) {
        prevNode.right = null;
        return true;
      }
      if (prevNode.right === null) {
        prevNode.left = null;
        return true;
      }
      if (prevNode.left.data === data) {
        prevNode.left = null;
        return true;
      }
      prevNode.right = null;
      return true;
    }
  }

  findPrev(data, node = this.root) {
    if (node === null) {
      return null;
    }
    if (node.data === data) {
      return 'root';
    }
    if (node.data <= data) {
      if (node.right.data === data) {
        return node;
      }
      return this.findPrev(data, node.right);
    }
    if (node.left.data === data) {
      return node;
    }
    return this.findPrev(data, node.left);
  }

  find(data, node = this.root) {
    if (node === null) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    if (node.data <= data) {
      return this.find(data, node.right);
    }
    return this.find(data, node.left);
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

/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import Node from './Node.js';

export default class Tree {
  #root = null;

  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.#buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  get root() {
    return this.#root;
  }

  set root(node) {
    this.#root = node;
  }

  #hasNoChild(node) {
    return node.left === null && node.right === null;
  }

  #hasTwoChildren(node) {
    return node.left !== null && node.right !== null;
  }

  #hasOnlyOneChild(node) {
    return (
      (node.left === null && node.right !== null) ||
      (node.left !== null && node.right === null)
    );
  }

  #hasLeftChild(node) {
    return node.left !== null;
  }

  #hasRightChild(node) {
    return node.right !== null;
  }

  #buildTree(sortedArr, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(sortedArr[mid]);
    root.left = this.#buildTree(sortedArr, start, mid - 1);
    root.right = this.#buildTree(sortedArr, mid + 1, end);

    return root;
  }

  #deleteRootNode(delNode) {
    const lowestNodeData = this.#getInorderSuccessor(delNode).data;
    this.delete(lowestNodeData);
    delNode.data = lowestNodeData;
  }

  #deleteNodeWithoutChild(delNode) {
    const parentNode = this.#getParentNode(delNode.data);
    const parentNodeDirection = this.#getParentDirection(
      parentNode,
      delNode.data,
    );
    if (parentNodeDirection === 'r') {
      parentNode.right = null;
      return true;
    }
    parentNode.left = null;
    return true;
  }

  #deleteNodeWithOneChild(delNode) {
    const parentNode = this.#getParentNode(delNode.data);
    const parentNodeDirection = this.#getParentDirection(
      parentNode,
      delNode.data,
    );
    if (parentNodeDirection === 'r') {
      parentNode.right = delNode.left === null ? delNode.right : delNode.left;
      return true;
    }
    parentNode.left = delNode.right === null ? delNode.left : delNode.right;
    return true;
  }

  #getInorderSuccessor(node) {
    if (node.right === null) {
      return null;
    }
    return this.#getMostLeftChild(node.right);
  }

  #getMostLeftChild(node) {
    if (node.left === null) {
      return node;
    }
    return this.#getMostLeftChild(node.left);
  }

  #getParentDirection(prNode, data) {
    if (prNode.left === null) {
      return 'r';
    }
    if (prNode.right === null) {
      return 'l';
    }
    if (prNode.left.data === data) {
      return 'l';
    }
    return 'r';
  }

  #getParentNode(data, node = this.root) {
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
      return this.#getParentNode(data, node.right);
    }
    if (node.left.data === data) {
      return node;
    }
    return this.#getParentNode(data, node.left);
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
    if (delNode === null) {
      return false;
    }
    if (this.#hasTwoChildren(delNode)) {
      return this.#deleteRootNode(delNode);
    }
    if (this.#hasNoChild(delNode)) {
      return this.#deleteNodeWithoutChild(delNode);
    }
    if (this.#hasOnlyOneChild(delNode)) {
      return this.#deleteNodeWithOneChild(delNode);
    }
    return false;
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

  levelOrder(stack, callback) {
    if (typeof stack === 'function') {
      callback = stack;
      stack = [this.root];
    } else if (stack === undefined) {
      stack = [this.root];
    }

    const newStack = [];
    let values = [];
    stack.forEach((node) => {
      if (callback) {
        callback(node);
      }
      values.push(node.data);
      if (node.left !== null) {
        newStack.push(node.left);
      }
      if (node.right !== null) {
        newStack.push(node.right);
      }
    });
    if (newStack.length !== 0) {
      values = values.concat(this.levelOrder(newStack, callback));
    }
    return values;
  }

  inorder(node, callback) {
    if (typeof node === 'function') {
      callback = node;
      node = this.root;
    } else if (node === undefined) {
      node = this.root;
    }

    let values = [];
    if (this.#hasLeftChild(node)) {
      values = values.concat(this.inorder(node.left, callback));
    }

    values.push(node.data);
    if (callback) {
      callback(node);
    }

    if (this.#hasRightChild(node)) {
      values = values.concat(this.inorder(node.right, callback));
    }
    return values;
  }

  preorder(node, callback) {
    if (typeof node === 'function') {
      callback = node;
      node = this.root;
    } else if (node === undefined) {
      node = this.root;
    }
    let values = [];

    values.push(node.data);
    if (callback) {
      callback(node);
    }

    if (this.#hasLeftChild(node)) {
      values = values.concat(this.preorder(node.left, callback));
    }

    if (this.#hasRightChild(node)) {
      values = values.concat(this.preorder(node.right, callback));
    }

    return values;
  }

  postorder(node, callback) {
    if (typeof node === 'function') {
      callback = node;
      node = this.root;
    } else if (node === undefined) {
      node = this.root;
    }
    let values = [];
    if (this.#hasLeftChild(node)) {
      values = values.concat(this.postorder(node.left, callback));
    }

    if (this.#hasRightChild(node)) {
      values = values.concat(this.postorder(node.right, callback));
    }

    values.push(node.data);
    if (callback) {
      callback(node);
    }

    return values;
  }

  height(h, node = this.root) {
    if (h === undefined) {
      h = 0;
    } else {
      h += 1;
    }
    if (this.#hasNoChild(node)) {
      return h;
    }

    let hLeft = 0;
    let hRight = 0;
    if (this.#hasLeftChild(node)) {
      hLeft = this.height(h, node.left);
    }
    if (this.#hasRightChild(node)) {
      hRight = this.height(h, node.right);
    }

    return hRight > hLeft ? hRight : hLeft;
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

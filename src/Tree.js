/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
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

  hasNoChild(node) {
    return node.left === null && node.right === null;
  }

  hasTwoChildren(node) {
    return node.left !== null && node.right !== null;
  }

  hasOnlyOneChild(node) {
    return (
      (node.left === null && node.right !== null) ||
      (node.left !== null && node.right === null)
    );
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
    const delNode = this.getNode(data);
    const prevNode = this.getParentNode(data);
    if (delNode === null) {
      return false;
    }
    if (this.hasTwoChildren(delNode)) {
      return this.deleteRootNode(delNode);
    }
    if (this.hasNoChild(delNode)) {
      return this.deleteNodeWithoutChild(prevNode, data);
    }
    if (this.hasOnlyOneChild(delNode)) {
      return this.deleteNodeWithOneChild(prevNode, delNode);
    }
    return false;
  }

  deleteRootNode(delNode) {
    const lowestNodeData = this.getInorderSuccessor(delNode).data;

    this.delete(lowestNodeData);
    delNode.data = lowestNodeData;
  }

  deleteNodeWithoutChild(prevNode, data) {
    const parentNodeDirection = this.getParentDirection(prevNode, data);
    if (parentNodeDirection === 'r') {
      prevNode.right = null;
      return true;
    }
    prevNode.left = null;
    return true;
  }

  deleteNodeWithOneChild(prevNode, delNode) {
    const parentNodeDirection = this.getParentDirection(prevNode, delNode.data);
    if (parentNodeDirection === 'r') {
      prevNode.right = delNode.left === null ? delNode.right : delNode.left;
      return true;
    }
    prevNode.left = delNode.right === null ? delNode.left : delNode.right;
    return true;
  }

  getInorderSuccessor(node) {
    if (node.right === null) {
      return null;
    }
    return this.getMostLeftChild(node.right);
  }

  getMostLeftChild(node) {
    if (node.left === null) {
      return node;
    }
    return this.getMostLeftChild(node.left);
  }

  getParentDirection(prNode, data) {
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

  getParentNode(data, node = this.root) {
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
      return this.getParentNode(data, node.right);
    }
    if (node.left.data === data) {
      return node;
    }
    return this.getParentNode(data, node.left);
  }

  getNode(data, node = this.root) {
    if (node === null) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    if (node.data <= data) {
      return this.getNode(data, node.right);
    }
    return this.getNode(data, node.left);
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

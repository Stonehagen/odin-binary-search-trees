import Node from './Node';

export default class {
  #root = null;

  constructor(arr) {
    this.root = this.buildTree(this.sortArray(arr));
  }

  get root() {
    return this.#root;
  }

  set root(node) {
    this.#root = node;
  }

  static sortArray(arr) {
    const sortedArr = [...new Set(arr)].sort();
    return sortedArr;
  }

  static buildTree(sortedArr, start, end) {
    const mid = Math.floor(start + end) / 2;
    const root = new Node(sortedArr[mid]);
    root.left = this.buildTree(sortedArr, start, mid + 1);
    root.right = this.buildTree(sortedArr, mid + 1, end);

    return root;
  }
}

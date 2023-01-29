export default class {
  #data = null;

  #left = null;

  #right = null;

  constructor(newData) {
    this.data = newData;
  }

  set data(newData) {
    this.#data = newData;
  }

  get data() {
    return this.#data;
  }

  set left(node) {
    this.#left = node;
  }

  get left() {
    return this.#left;
  }

  set right(node) {
    this.#right = node;
  }

  get right() {
    return this.#right;
  }
}

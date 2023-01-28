export default class {
  #data = null;

  #left = null;

  #right = null;

  constructor(data) {
    this.data = data;
  }

  set data(data) {
    this.#data = data;
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

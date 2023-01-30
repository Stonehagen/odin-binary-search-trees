/* eslint-disable import/extensions */
import Tree from './src/Tree.js';

const newTree = new Tree([
  1,
  2,
  3,
  12,
  13,
  19,
  75,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  32,
  43,
  54,
  53,
  88,
  99,
  89,
  17,
  91,
  89,
  95,
  31,
]);

newTree.delete(7);

newTree.prettyPrint(newTree.root);

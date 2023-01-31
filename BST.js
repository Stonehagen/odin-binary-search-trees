/* eslint-disable import/extensions */
import Tree from './src/Tree.js';
import Node from './src/Node.js';

const newTree = new Tree([
  1, 2, 3, 12, 13, 19, 75, 3, 4, 5, 6, 7, 8, 9, 32, 43, 54, 53, 88, 99, 89, 17,
  91, 89, 95, 31, 63, 64, 65, 78, 89, 47, 48, 40, 82, 84, 85,
]);

newTree.prettyPrint(newTree.root);

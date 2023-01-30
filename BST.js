/* eslint-disable import/extensions */
import Tree from './src/Tree.js';

const newTree = new Tree([
  1, 2, 3, 12, 13, 19, 75, 3, 4, 5, 6, 7, 8, 9, 32, 43, 54, 53, 88, 99, 89, 17,
  91, 89, 95, 31, 63, 64, 65, 78, 89, 47, 48, 40, 82, 84, 85,
]);

newTree.insert(1.1);
newTree.insert(1.2);
newTree.insert(1.3);
newTree.insert(1.4);
newTree.insert(1.5);
newTree.insert(1.6);
newTree.insert(1.7);
newTree.insert(1.8);
newTree.insert(1.9);
newTree.rebalance();
newTree.prettyPrint(newTree.root);

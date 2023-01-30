/* eslint-disable import/extensions */
import Tree from './src/Tree.js';

const newTree = new Tree([1, 2, 3, 12, 13, 19, 75, 3, 4, 5, 6, 7, 8, 9]);
newTree.insert(5.4);
newTree.delete(13);

newTree.prettyPrint(newTree.root);

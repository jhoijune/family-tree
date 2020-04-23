import { createTree } from './util';
import data from '../data.json';
import { FamilyNode, Position } from './type';

const tree = createTree(data);

let l: Position<FamilyNode>;
let r: Position<FamilyNode>;
for (const position of tree.positions()) {
  if (position.element!.name === '동균') {
    l = position;
  }
  if (position.element!.name === '미숙') {
    r = position;
  }
}
console.log(tree.sumExternalNode(l!));
console.log(tree.calculateNodeInterval(l!, r!, 50, 10));

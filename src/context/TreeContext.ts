// tree객체와 tree 설정을 가지고 있는 context
import { createContext } from 'react';

import { FamilyTree } from '../DataStructure';
import { FamilyNode } from '../type';
import { lastName, treeSetting } from '../setting';

export default createContext({
  treeObj: new FamilyTree<FamilyNode>(lastName),
  ...treeSetting,
});

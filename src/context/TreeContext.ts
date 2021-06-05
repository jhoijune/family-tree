// tree객체를 가지고 있는 context
import { createContext } from 'react';

import { FamilyTree } from '../DataStructure';
import { FamilyNode } from '../type';
import { LAST_NAME } from '../setting';

export default createContext({
  treeObj: new FamilyTree<FamilyNode>(LAST_NAME),
});

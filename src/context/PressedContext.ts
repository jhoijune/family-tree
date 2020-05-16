// 현재 누른 position 변경하는 context
import { createContext } from 'react';

import { Position, FamilyNode } from '../type';

export default createContext({
  setPressedPosition: (
    value: React.SetStateAction<Position<FamilyNode> | null>
  ) => {},
});

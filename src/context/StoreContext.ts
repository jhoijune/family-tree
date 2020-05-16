import { createContext } from 'react';

import { ID } from '../type';

export default createContext({
  getIDs: async (): Promise<ID[] | null | undefined> => null,
  isIDIncluded: (id: ID): boolean => false,
  storeID: async (id: ID): Promise<void> => {},
  deleteID: async (id: ID): Promise<void> => {},
});

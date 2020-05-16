// loading 상태인지 알려주는 context
import { createContext } from 'react';

export default createContext({
  setIsLoading: (value: React.SetStateAction<boolean>): void => {},
});

import { createContext } from 'react';

export default createContext({
  visible: false,
  setVisible: (value: React.SetStateAction<boolean>): void => {},
});

// popup 정보 설정하는 context
import { createContext } from 'react';

import { PopupInfo } from '../type';

export default createContext({
  setInfo: (value: React.SetStateAction<PopupInfo>): void => {},
});

import { createContext, MutableRefObject } from 'react';

export default createContext<MutableRefObject<boolean> | null>(null);

import { useContext } from 'react';
import appContext from './appContext';

export const useAppContext = () => useContext(appContext);

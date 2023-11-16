import { Dispatch, SetStateAction, createContext, } from 'react'
export const ThemeContext = createContext('')
export const getBack = createContext('')
export interface RefreshDataContextProps {
    setRefreshData: Dispatch<SetStateAction<boolean>>;
    refreshData: boolean;
}
export const fetchData = createContext<RefreshDataContextProps | undefined>(undefined);


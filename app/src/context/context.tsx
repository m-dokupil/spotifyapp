import { createContext, ReactNode, useContext, useState } from 'react';
import { SpotifyUserResponse } from '../interfaces/SpotifyUserResponse';

interface AppContextType {
  searchTypes: string[];
  setSearchTypes: (types: string[]) => void;
  userData: SpotifyUserResponse;
  setUserData: (data: SpotifyUserResponse) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTypes, setSearchTypes] = useState(['track'] as string[]);
  const [userData, setUserData] = useState({} as SpotifyUserResponse);

  return (
    <AppContext.Provider value={{ searchTypes, setSearchTypes, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
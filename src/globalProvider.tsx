import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir una interfaz para el contexto global
interface GlobalContextType {
  showLogin: boolean;
  toggleLogin: () => void;
  globalStartDate: string | null;
  globalEndDate: string | null;
  setGlobalDates: (start: string, end: string) => void;
}

// Crear el contexto global con un valor inicial
const GlobalContext = createContext<GlobalContextType>({
  showLogin: true,
  toggleLogin: () => {},
  globalStartDate: null,
  globalEndDate: null,
  setGlobalDates: () => {},
});

// Proveedor del contexto global
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [globalStartDate, setGlobalStartDate] = useState<string | null>(null);
  const [globalEndDate, setGlobalEndDate] = useState<string | null>(null);

  const toggleLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const setGlobalDates = (start: string, end: string) => {
    setGlobalStartDate(start);
    setGlobalEndDate(end);
  };

  // Value proporcionado por el contexto global
  const value = {
    showLogin,
    toggleLogin,
    globalStartDate,
    globalEndDate,
    setGlobalDates,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

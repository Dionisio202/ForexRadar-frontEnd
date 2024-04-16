// globalProvider.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir una interfaz para el contexto global
interface GlobalContextType {
  showLogin: boolean;
  toggleLogin: () => void;
}

// Crear el contexto global con un valor inicial
const GlobalContext = createContext<GlobalContextType>({
  showLogin: true,
  toggleLogin: () => {},
});

// Proveedor del contexto global
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  // Value proporcionado por el contexto global
  const value = {
    showLogin,
    toggleLogin,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para consumir el contexto global
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

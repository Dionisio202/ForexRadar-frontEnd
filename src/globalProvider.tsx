import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir una interfaz para la divisa
interface Divisa {
  nombre: string;
  imagen1: string;
  imagen2: string;
  id: number;
}
interface ForexData {
  timestamp: string;
  valor: number;
  cambio: number;
  cambioPorcentaje: number;
  color: string;
  divisa:string
}
interface ProfileData{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

// Definir una interfaz extendida para el contexto global que incluye las divisas
interface GlobalContextType {
  showLogin: boolean;
  isLogin: boolean;
  toggleLogin: () => void;
  globalStartDate: string | null;
  globalEndDate: string | null;
  frequency: string | null;
  GlobaldivisaName: string | null;
  divisas: Divisa[]; // Nuevo campo para las divisas
  setGlobalDates: (start: string, end: string) => void;
  setFrequency: (frequency: string) => void;
  setGlobaldivisaName: (divisaName: string) => void;
  setDivisas: (divisas: Divisa[]) => void; // Nuevo setter para actualizar divisas
  setIsLogin: (value: boolean) => void;
  previousValue: ForexData | null;
  setPreviousValue: (data: ForexData) => void;
  profile: ProfileData | null;
  setProfile: (data: ProfileData) => void;
  isSipnner: boolean;
  setIsSpinner: (value: boolean) => void;
}

// Crear el contexto global con un valor inicial
const GlobalContext = createContext<GlobalContextType>({
  showLogin: true,
  isLogin: false,
  toggleLogin: () => {},
  globalStartDate: null,
  globalEndDate: null,
  frequency: null,
  GlobaldivisaName: null,
  divisas: [], // Inicializar divisas como un arreglo vacío
  setGlobalDates: () => {},
  setFrequency: () => {},
  setGlobaldivisaName: () => {},
  setDivisas: () => {}, // Inicializar setDivisas como una función vacía
  setIsLogin: () => {},
  previousValue: null,
  setPreviousValue: () => {},
  profile: null,
  setProfile: () => {},
  isSipnner: true,
  setIsSpinner: () => {},
});

// Proveedor del contexto global
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [globalStartDate, setGlobalStartDate] = useState<string | null>(null);
  const [globalEndDate, setGlobalEndDate] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [GlobaldivisaName, setGlobaldivisaName] = useState<string | null>(null);
  const [divisas, setDivisas] = useState<Divisa[]>([]);
  const [previousValue, setPreviousValue] = useState<ForexData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isSipnner, setIsSpinner] = useState(true);
  const toggleLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const setGlobalDates = (start: string, end: string) => {
    setGlobalStartDate(start);
    setGlobalEndDate(end);
  };

  const updateFrequency = (newFrequency: string) => {
    setFrequency(newFrequency);
  };

  const updateGlobaldivisaName = (divisaName: string) => {
    setGlobaldivisaName(divisaName);
  };

  const setIsUserLoggedIn = (value: boolean) => {
    setIsLogin(value);
  };

  // Value proporcionado por el contexto global
  const value = {
    showLogin,
    isLogin,
    toggleLogin,
    globalStartDate,
    globalEndDate,
    frequency,
    GlobaldivisaName,
    divisas,
    setGlobalDates,
    setFrequency: updateFrequency,
    setGlobaldivisaName: updateGlobaldivisaName,
    setDivisas,
    setIsLogin: setIsUserLoggedIn,
    previousValue,
    setPreviousValue,
    profile,
    setProfile,
    isSipnner,
    setIsSpinner,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar el contexto global
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from './globalProvider';

const Frecuency = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('Diario');
  const { setFrequency } = useGlobalContext();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para el menú desplegable

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const options = ['Diario', 'Mensual', 'Semanal'];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowMenu(false); // Cerrar el menú después de seleccionar una opción
    // Actualizar la frecuencia en el contexto global
    let valor = option;
    if(option === 'Diario'){
      valor = 'D';
    }else if(option === 'Mensual'){
      valor = 'M';
    }else if(option === 'Semanal'){
      valor = 'W';
    }
    console.log('Opción seleccionada:', option);
    setFrequency(valor);
  };

  useEffect(() => {
    // Agregar el manejador de eventos para cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para cerrar el menú cuando se hace clic fuera de él
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Contenedor del botón */}
      <div
        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={toggleMenu}
        tabIndex={0}
        role="button"
        aria-label=""
      >
        <span className='text-white text-xl '>Frecuencia : { selectedOption}</span>
        {/* Icono desplegable */}
        <svg
          className="w-4 h-4 text-white fill-current"
          viewBox="0 0 512 512"
          onClick={toggleMenu}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M500.77 131.432L477.53 108.18c-14.45-14.55-40.11-14.55-54.51 0L255.845 275.363 88.582 108.124c-15.015-14.874-39.363-14.874-54.42.108L10.94 131.486c-14.58 14.44-14.58 40.11-.033 54.442l217.77 217.845c15.004 14.82 39.33 14.874 54.42-.108L500.88 185.82c14.818-14.982 14.87-39.298-.11-54.388z"
          />
        </svg>
      </div>

      {/* Menú desplegable */}
      {showMenu && (
        <div className="absolute top-full left-0 mt-2 ml-12 w-15 bg-white border border-gray-200 shadow-lg rounded-lg z-10 text-black">
          {/* Contenido del menú */}
          <div className="p-2">
            {/* Renderizar opciones del menú */}
            {options.map((option) => (
              <div
                key={option}
                className="cursor-pointer py-1 hover:bg-gray-100 text-sm px-2"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Frecuency;

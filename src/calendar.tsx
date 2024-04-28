import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from './globalProvider';

const CustomDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { setGlobalDates } = useGlobalContext();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para el menú desplegable

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      console.log('Fecha de inicio:', startDate);
      console.log('Fecha de fin:', endDate);
      const formattedStartDate = formatDateSend(startDate);
      const formattedEndDate = formatDateSend(endDate);
      setGlobalDates(formattedStartDate, formattedEndDate);
    }
    setShowMenu(false);
  };

  const formatDateSend = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    return date.toLocaleDateString('es-ES', options);
  };

  const getOneYearAgoDate = (): Date => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    return oneYearAgo;
  };

  const getEndOfYearDate = (): Date => {
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), today.getMonth(), today.getDay() + 6);
    return endOfYear;
  };

  useEffect(() => {
    if (!startDate || !endDate) {
      setStartDate(getOneYearAgoDate());
      setEndDate(getEndOfYearDate());
    }

    // Agregar el manejador de eventos para cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startDate, endDate]);

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
        <span className='text-white text-xl'>{startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Selecciona fechas'}</span>
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
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
          {/* Contenido del menú */}
          <div className="p-4">
            {/* Calendario de fecha de inicio */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                maxDate={endDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Calendario de fecha de fin */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de fin</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                minDate={startDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Botón de confirmación */}
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring focus:ring-blue-400"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import AddDivisa from './add-Divisa.tsx';
import ApexChart from './ForexChart.tsx';
import CustomDropdown from './calendar.tsx';
import Frecuency from './frecuency.tsx';
import CurrentData from './currentData.tsx';
import userIcon from '../src/assets/userI.svg';
import Sidebar from 'react-sidebar';
import DeleteDivisa from './delete-Divisa.tsx';
import { Divisa, fetchDivisasDelete } from './methods.tsx';
import { useGlobalContext } from './globalProvider';


const DivisaInformation = () => {
  const [showContainer, setShowContainer] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [divisas, setDivisas] = useState<Divisa[]>([]);
  const {globalStartDate} = useGlobalContext();
  const {globalEndDate} = useGlobalContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener las divisas utilizando la función fetchDivisas
        const data = await fetchDivisasDelete();
        setDivisas(data); // Almacenar las divisas en el estado local
  
      } catch (error) {
        console.error('Error al obtener divisas:', error);
      }
    };

    fetchData(); // Llamar a la función para obtener datos al montar el componente
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez al montar el componente

  const toggleContainer = () => {
    setShowContainer(!showContainer);
  };

  const openModal = () => {
    setModalIsOpen(true);
  
  };

 

  return (
    <div className="flex flex-col w-full h-full bg-fondo">
      {/* Encabezado sobre el contenido */}
      <div className="bg-fondo text-white py-4 text-center flex justify-center gap-20">
        <CurrentData currencyPair="EURUSD" />
        <CustomDropdown />
        <Frecuency />
      </div>

      {/* Contenedor principal con gráfico y rectángulos */}
      <div className="flex flex-grow w-full">
        {/* Gráfico que ocupa el 70% del ancho */}
        <div className="w-full h-full bg-white relative">
          <ApexChart currencyPair="EURUSD" frecuency='D'  startDate={globalStartDate||"2020-05-01"} endDate={globalEndDate||"2024-01-01"}/>

          {/* Contenedor desplegable */}
          <Sidebar
            sidebar={
              <div className="bg-white h-full w-56 flex flex-col items-center mt-2">
                <AddDivisa />
              
                <div className="flex flex-col">
      {/* Verificar si hay datos en el array divisas */}
      {divisas.length > 0 ? (
        // Renderizar dinámicamente DivisaData para cada divisa en el array divisas
        divisas.map((divisa) => (
          <DeleteDivisa
            key={divisa.id}  // Asegúrate de proporcionar una key única para cada elemento en el array
            id={divisa.id} 
            divisaName={divisa.nombre}
            img1={divisa.imagen1} 
            img2={divisa.imagen2}
          />
        ))
      ) : (
        // Mostrar mensaje cuando no hay datos en el array divisas
        <p className='flex justify-center items-center'>No tienes datos de divisas.</p>
      )}
    </div>
              </div>
            }
            open={showContainer}
            onSetOpen={setShowContainer}
            pullRight
            styles={{
              sidebar: {
                background: 'white',
                width: '256px',
                zIndex: '9999',
              },
              overlay: {
                zIndex: '9998',
              },
            }}
          />
        </div>

        {/* Botón con ícono que muestra/oculta el contenedor al lado */}
        <div className="w-20 bg-white border border-gray-300 border-4 p-2 flex-col justify-center items-center text-center space-y-6">
          <button onClick={openModal}>
            <img
              src={userIcon}
              alt="user icon"
              className="text-gray-50 text-xl inline-block mr-2 bg-transparent w-10 h-10"
            />
          </button>

          {/* Otros botones con íconos */}
          <button onClick={toggleContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 44"
              className="text-black-500 text-7xl inline-block mr-2 bg-transparent w-12 h-12"
            >
              <path
                fill="currentColor"
                d="M13 11h18a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V13c0-1.1.9-2 2-2Zm18-1H13a3 3 0 0 0-3 3v17a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V13a3 3 0 0 0-3-3Zm-2 11H15v1h14v-1Zm-14-5h14v1H15v-1Zm14 10H15v1h14v-1Z"
              ></path>
            </svg>
          </button>

          <button onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 44 44"
              className="text-black-500 text-7xl inline-block mr-2 bg-transparent w-12 h-12"
            >
              <path
                fill="currentColor"
                d="M35 14.66 29.16 9l-.7.72 5.84 5.66.7-.72ZM9 14.66 14.84 9l.7.72-5.84 5.66-.7-.72ZM22 16v7h-5v1h6v-8h-1Z"
              ></path>
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22 33a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-1a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default DivisaInformation;

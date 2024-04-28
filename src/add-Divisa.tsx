import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DivisaData from './divisaData';
import { fetchDivisas,Divisa } from './methods'; // Importar la función para obtener datos

const AddDivisa = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [divisas, setDivisas] = useState<Divisa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener las divisas utilizando la función fetchDivisas
        const data = await fetchDivisas();
        setDivisas(data); // Almacenar las divisas en el estado local
      } catch (error) {
        console.error('Error al obtener divisas:', error);
      }
    };

    fetchData(); // Llamar a la función para obtener datos al montar el componente
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez al montar el componente

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center text-center">
      <h1 className="mr-1 text-lg ml-5">Lista de seguimiento</h1>
      <button onClick={openModal} className='hover:text-black hover:scale-110 transition-transform duration-300'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="35"
          height="35"
          fill="none"
          style={{ marginTop: '1px' }}
        >
          <path fill="currentColor" d="M7 13h7V6h1v7h7v1h-7v7h-1v-7H7v-1z"></path>
        </svg>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal Agregar Símbolo"
        className="modal fixed inset-0 flex  justify-center m-6"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50"
        style={{
          overlay: {
            zIndex: 9999, // Establecer un valor alto de z-index para el overlay
          },
        }}
      >
        <div className="bg-white p-8 rounded shadow-lg max-w-3xl w-full">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-80">
            <span className="mr-20">Agregar Símbolo</span>
            <button className="hover:text-gray-500" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18"
                height="18"
                className="ml-16 text-black-400"
              >
                <path stroke="currentColor" strokeWidth="1.2" d="m1.5 1.5 15 15m0-15-15 15" />
              </svg>
            </button>
         
          </h2>
          <div className="flex flex-col">
            {/* Renderizar dinámicamente DivisaData para cada divisa en el array divisas */}
            {divisas.map((divisa) => (
              <DivisaData
             id={divisa.id} 
                divisaName={divisa.nombre}
                img1={divisa.imagen1} 
                img2={divisa.imagen2}               />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddDivisa;

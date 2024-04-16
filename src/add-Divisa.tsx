import React, { useState } from 'react';
import Modal from 'react-modal';
import DivisaData from './divisaData';
const AddDivisa = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  return (
    <div className='flex items-center justify-center text-center'> 
      <h1 className='mr-1 text-lg ml-5'>Lista de seguimiento</h1>
      <button onClick={openModal}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        width="35"
        height="35"
        fill="none"
        style={{ marginTop: '1px' }}
      >
        <path
          fill="currentColor"
          d="M7 13h7V6h1v7h7v1h-7v7h-1v-7H7v-1z"
        ></path>
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
            zIndex: 9999 // Establece un valor alto de z-index para el overlay
          }
        }}
      >
        <div className="bg-white p-8 rounded shadow-lg  max-w-3xl w-full ">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-80">
              <span className='mr-20'>Agregar Símbolo</span>
              <button className='hover:text-gray-500' onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18"
                height="18"
                className="ml-16 text-black-400"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.2"
                  d="m1.5 1.5 15 15m0-15-15 15"
                />
              </svg>
              </button>
              
            </h2>
            <div className="flex flex-col">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 flex-1 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                className="mr-2 text-gray-400"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.2"
                  d="M12.4 12.5a7 7 0 1 0-4.9 2 7 7 0 0 0 4.9-2zm0 0l5.101 5"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar símbolo..."
                className="border-none outline-none flex-1 w-100"
              />
            </div>
        {/*aquiel componente */}
           <DivisaData/>
           <DivisaData/>
           <DivisaData/>
          </div>
     
        </div>
      </Modal>
    </div>
  );
};

export default AddDivisa;

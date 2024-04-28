import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useGlobalContext } from './globalProvider';
import DivisaData from './alarmDivisa';
import ProfilEdit from './profile-edit';

const AlarmaModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {divisas} = useGlobalContext();
 
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center text-center">
        <button onClick={openModal} className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-0">
            Editar
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
            <span className="mr-20">Editar Perfil</span>
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
    <ProfilEdit />        
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AlarmaModal;

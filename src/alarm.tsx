import React from 'react';

const Alarm: React.FC = () => {
  // URL de la imagen estática
  const imageUrl = '../src/assets/nt.png'

  return (
    <>
    <div className='flex-col justify-center items-center'>
        <button>
        <img src={imageUrl} alt="Imagen" className='w-50 h-32 mt-11'  />

        </button>
    </div>
   
          <p className='text-center text-sm p-6 '>Aquí podrá observar sus notificaciones de los cambios de sus divisas cuando seleccione ua divisa</p>

    </>
    
  );
};

export default Alarm;

import React from 'react';

const divisaData = () => {
  return (
<div>
    <div className="flex m-2 items-center w-full justify-center">
    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black overflow-hidden">
        <img src="ruta-a-tu-imagen-1" alt="Bandera 1" className="w-full h-full object-cover" />
    </div>
    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black overflow-hidden">
        <img src="ruta-a-tu-imagen-2" alt="Bandera 2" className="w-full h-full object-cover" />
    </div>
    <div className="flex justify-center items-center ml-5">
    <h1 className="text-lg">EUR/USD</h1>
    </div>  
    <button className='ml-60'>
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
  
</div>
 <div className='w-full border-b border-black'>

 </div>
 </div>
  );
};

export default divisaData;

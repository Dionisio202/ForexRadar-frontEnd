import React from 'react';
import { insertDivisaUser } from './methods';
import { useGlobalContext } from './globalProvider';
interface DivisaDataProps {
  divisaName: string;
  img1:string;
  img2:string;
  id: number;
}

const divisaData: React.FC<DivisaDataProps> = ({id, divisaName ,img1,img2}) => {
  const {setDivisas} = useGlobalContext();
  const {setIsSpinner} = useGlobalContext();
  const handleClick = () => {
   
    //const user=localStorage.getItem('userId');
    const user = localStorage.getItem('userId') ?? '';
    //console.log(`ID seleccionado: ${id} y el usuario es ${user}`);

    insertDivisaUser(id,user,setDivisas,setIsSpinner);

  };

  return (
<div>
    <div className="flex m-2 items-center w-full justify-center">
    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black overflow-hidden">
        <img src={img1} alt="Bandera 1" className="w-full h-full object-cover" />
    </div>
    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black overflow-hidden">
        <img src={img2} alt="Bandera 2" className="w-full h-full object-cover" />
    </div>
    <div className="flex justify-center items-center ml-5  w-20 ">
    <h1 className="text-lg">{divisaName}</h1>
    </div>  
    
    <button className='ml-40 hover:scale-110 transition-transform duration-300 hover:text-green-800' onClick={handleClick}>
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

import React from 'react';
import { DeleteDivisa, fetchDivisasDelete } from './methods';
import { useGlobalContext } from './globalProvider';

interface DivisaDataProps {
  divisaName: string;
  img1:string;
  img2:string;
  id: number;
}

const deleteDivisa: React.FC<DivisaDataProps> = ({id, divisaName ,img1,img2}) => {
  const {setGlobaldivisaName } = useGlobalContext();
  const {setDivisas} = useGlobalContext();
  const {setIsSpinner} = useGlobalContext();
  const handleClick = async () => {
    const user = localStorage.getItem('userId') ?? '';
    const ID = id.toString();
    DeleteDivisa(user,ID,setDivisas,setGlobaldivisaName,setIsSpinner);
      
  };
const handleDivisanameClik = () => {
  let divisaData=divisaName.replace('/', '');
  setGlobaldivisaName(divisaData);
  
}
  return (
<div>

    <div className="flex m-2 items-center w-full justify-center">
    <button onClick={handleDivisanameClik} className='flex hover:scale-110 transition-transform duration-300'>
    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-black overflow-hidden">
        <img src={img1} alt="Bandera 1" className="w-full h-full object-cover" />
    </div>
    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-black overflow-hidden">
        <img src={img2} alt="Bandera 2" className="w-full h-full object-cover" />
    </div>
    <div className="flex justify-center items-center ml-0">
    <h1 className="text-sm">{divisaName}</h1>
    </div>  
    </button>
    <button className='ml-0 hover:text-red-500 hover:scale-110 transition-transform duration-300' onClick={handleClick} >
      <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="14"
                height="14"
                className="ml-16 text-black-400"
                style={{ marginTop: '1px' }}
              >
                <path stroke="currentColor" strokeWidth="1.2" d="m1.5 1.5 15 15m0-15-15 15" />
              </svg>
      
    </button>
  
</div>
 <div className='w-full border-b border-black'>

 </div>

 </div>
  );
};

export default deleteDivisa;

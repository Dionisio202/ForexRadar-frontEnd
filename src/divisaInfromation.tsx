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
import { Divisa, fetchDivisasDelete, getProfile } from './methods.tsx';
import { useGlobalContext } from './globalProvider';
import Alarm from './alarm.tsx';

import Notification from './notification.tsx';
import ProfileForm from './profile.tsx';
import Spinner from './spinner.tsx';

interface ForexData {
  timestamp: string;
  valor: number;
  cambio: number;
  cambioPorcentaje: number;
  color: string;
  divisa:string
}

const DivisaInformation = () => {
  const [showContainer, setShowContainer] = useState(false);
  const {globalStartDate} = useGlobalContext();
  const {globalEndDate} = useGlobalContext();
  const {frequency} = useGlobalContext();
  const {GlobaldivisaName} = useGlobalContext();
  const [sidebarContent, setSidebarContent] = useState<'default' | 'user' | 'alarm'>('default'); 
  const {setDivisas} = useGlobalContext();
  const {divisas} = useGlobalContext();
  const {previousValue} = useGlobalContext();
  const [previousValuesArray, setPreviousValuesArray] = useState([] as ForexData[]);
  const { profile} = useGlobalContext(); 
  const { setProfile} = useGlobalContext(); 
  const { isSipnner} = useGlobalContext(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem('userId') ?? '';
        const data = await fetchDivisasDelete(user);
        setDivisas(data); // Almacenar las divisas en el estado local
        const id = localStorage.getItem('userId') ?? '';
        getProfile(id, setProfile);
      } catch (error) {
        console.error('Error al obtener divisas:', error);
      }
    };

    fetchData(); // Llamar a la función para obtener datos al montar el componente
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez al montar el componente

  useEffect(() => {
    if (previousValue) {
      const isDuplicate = previousValuesArray.some(item => item.timestamp === previousValue.timestamp);
      
      if (!isDuplicate) {
        setPreviousValuesArray(prevArray => [...prevArray, previousValue]);
        if (previousValuesArray.length > 1) {
          const previousValueIndex = previousValuesArray.length - 2;
          const previousValue = previousValuesArray[previousValueIndex];
          if(previousValue.divisa == previousValuesArray[previousValuesArray.length - 1].divisa){
          if (previousValue.valor > previousValuesArray[previousValuesArray.length - 1].valor) {
            alert('El valor actual es menor que el valor anterior');
          } else if(previousValue.valor < previousValuesArray[previousValuesArray.length - 1].valor) {
            alert('El valor actual es mayor que el valor anterior');
          }else if(previousValue.valor ==previousValuesArray[previousValuesArray.length - 1].valor){
            alert('El valor actual es igual al valor anterior');
            console.log(previousValue.valor ,previousValue.divisa,previousValue.timestamp,previousValue.cambio,previousValue.cambioPorcentaje,previousValue.color);
            console.log(previousValuesArray[previousValuesArray.length - 1].valor,previousValuesArray[previousValuesArray.length - 1].divisa,previousValuesArray[previousValuesArray.length - 1].timestamp,previousValuesArray[previousValuesArray.length - 1].cambio,previousValuesArray[previousValuesArray.length - 1].cambioPorcentaje,previousValuesArray[previousValuesArray.length - 1].color);
          }
        }
        }
      }
    }
  }, [previousValue, previousValuesArray]);
  

  const toggleContainer = () => {
    setShowContainer(!showContainer);
    setSidebarContent('default');
  };

  const toggleContainerUser = () => {
    setShowContainer(!showContainer);
    setSidebarContent('user');
  

  };

 const toggleContainerAlarm = () => {
    setShowContainer(!showContainer);
    setSidebarContent('alarm');
  };
 

  return (
    <div className="flex flex-col w-full h-full bg-fondo">
     
      <div className="bg-fondo text-white py-4 text-center flex justify-center gap-20">
        <CurrentData currencyPair={GlobaldivisaName||""} />
        <CustomDropdown />
        <Frecuency />
      </div>

      {/* Contenedor principal con gráfico y rectángulos */}
      <div className="flex flex-grow w-full">
        {/* Gráfico que ocupa el 70% del ancho */}
        <div className="w-full h-full bg-white relative">
          {
            GlobaldivisaName?(<ApexChart currencyPair={GlobaldivisaName||""} frecuency={frequency||"D"}  startDate={globalStartDate||"2023-04-24"} endDate={globalEndDate||"2024-04-09"}/>
            
          ):(
            <div className="flex-col justify-center items-center h-full">
  <p className="text-2xl text-center mt-14 font-semibold">Seleccione una divisa</p>
  <img src="../src/assets/fx-m.png" alt="Imagen" className="w-80 h-62 mt-11 mx-auto" />
  <p className='h-44'></p>
</div>

          )
          }

          {/* Contenedor desplegable */}
          <Sidebar
            sidebar={
              sidebarContent === 'default' ? (
                <div className="bg-white h-full w-56 flex flex-col items-center mt-2">
                  <AddDivisa />
                  <div className="flex flex-col mt-3">
                    {/* Verificar si hay datos en el array divisas */}
                    {isSipnner?(divisas.length > 0 ? (
                      divisas.map((divisa) => (
                        <DeleteDivisa
                          key={divisa.id}
                          id={divisa.id}
                          divisaName={divisa.nombre}
                          img1={divisa.imagen1}
                          img2={divisa.imagen2}
                        />
                      ))
                    ) : (
                      <p className="flex justify-center items-center">
                        No tienes datos de divisas.
                      </p>
                    )):(
                    <div className='flex justify-center items-center mt-25 '><Spinner/></div>
                    )}
                  </div>
                </div>
              ) : sidebarContent === 'user' ? (
                <div className="bg-white h-full w-56 flex flex-col items-center mt-2">
                  {profile?(
                    <ProfileForm />):(<p className="flex justify-center items-center">
                    Cargando datos ....
                  </p>)}
                </div>
              ) : sidebarContent === 'alarm' ? (
                <div className="bg-white h-full w-full flex flex-col items-center mt-2">
                 { previousValuesArray.length>0? (
                  previousValuesArray.map((item) => (
                  <Notification key={item.timestamp} timestamp={item.timestamp} valor={item.valor} cambio={item.cambio} cambioPorcentaje={item.cambioPorcentaje} color={item.color} divisa={item.divisa}/>
                  ))
):(<Alarm />)}
                </div>
              ) : null
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
        <div className="w-20 bg-white border border-gray-300 border-4 p-2 flex-col justify-center items-center text-center space-y-6 ">
          <button onClick={toggleContainerUser} className=' hover:scale-125 transition-transform duration-300'>
            <img
              src={userIcon}
              alt="user icon"
              className="text-gray-50 text-xl inline-block mr-2 bg-transparent w-10 h-10"
            />
          </button>

          {/* Otros botones con íconos */}
          <button onClick={toggleContainer} className=' hover:scale-125 transition-transform duration-300'>
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

          <button onClick={toggleContainerAlarm} className=' hover:scale-125 transition-transform duration-300'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44"><path fill="currentColor" d="M22.5 11a2.5 2.5 0 0 0-2.48 2.14.5.5 0 0 1-.3.4C16.97 14.63 15 17.2 15 20V27h15V20c0-2.8-1.98-5.37-4.71-6.46a.5.5 0 0 1-.31-.4A2.5 2.5 0 0 0 22.5 11ZM31 27a2 2 0 1 1 0 4h-5.04c-.26 1.57-1.7 3-3.46 3a3.62 3.62 0 0 1-3.46-3H14a2 2 0 1 1 0-4V20c0-3.18 2.16-6.01 5.09-7.28a3.5 3.5 0 0 1 6.82 0C28.84 13.99 31 16.82 31 20V27Zm-10.94 4c.25 1.06 1.26 2 2.44 2s2.19-.94 2.44-2h-4.88ZM14 28a1 1 0 1 0 0 2h17a1 1 0 1 0 0-2H14Z"></path></svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default DivisaInformation;

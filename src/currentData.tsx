import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useGlobalContext } from './globalProvider';

interface ForexData {
  timestamp: string;
  valor: number;
  cambio: number;
  cambioPorcentaje: number;
  color: string;
  divisa:string
}

interface Props {
  currencyPair: string;
}

const CurrentData: React.FC<Props> = ({ currencyPair }) => {
  const [forexData, setForexData] = useState<ForexData | null>(null);
  const {setPreviousValue} = useGlobalContext();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/divisa/currentData/?divisas=${currencyPair}`);
      setForexData(response.data);
        console.log('Actualizando data:', response.data);
      

      setTimeout(() => {
        fetchData(); // Llamada recursiva después de 2 segundos
      }, 10000);
    } catch (error) {
      console.error('error al obtener data:', error);
    }
  };

  useEffect(() => {
    if (currencyPair !== "") {
      fetchData(); // Realiza la primera llamada cuando se monta el componente
    }
  }, [currencyPair]);
  if (currencyPair == "") {
    return <p className='text-xl'>Selecione una divisa</p>;
  }else{
  if (!forexData) {
    return <p className='text-xl'>Cargando datos...</p>;
  }
  if (forexData.divisa === currencyPair) {
    setPreviousValue(forexData);
    return (
      <div className="">
        <span className='text-xl mr-4'>Precio Actual :{' '}{ forexData.valor}</span>
        <span style={{ color: forexData.color }}>{forexData.cambio}{' '}({forexData.cambioPorcentaje})%</span>
      </div>
    );
  }
  if(forexData.divisa != currencyPair){
    return <p className='text-xl'>Cargando datos...</p>;
  }
}
};

export default CurrentData;
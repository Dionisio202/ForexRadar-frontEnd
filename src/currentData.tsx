import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ForexData {
  timestamp: string;
  valor: number;
  cambio: number;
  cambioPorcentaje: number;
  color: string;
}

interface Props {
  currencyPair: string;
}

const CurrentData: React.FC<Props> = ({ currencyPair }) => {
  const [forexData, setForexData] = useState<ForexData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/divisa/currentData/?divisas=${currencyPair}`);
      setForexData(response.data);
      console.log('Actualizando data:', response.data);

      // Esperar 2 segundos antes de realizar la próxima actualización
      setTimeout(() => {
        fetchData(); // Llamada recursiva después de 2 segundos
      }, 10000);
    } catch (error) {
      console.error('Error fetching forex data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Realiza la primera llamada cuando se monta el componente
  }, [currencyPair]);

  if (!forexData) {
    return <p className='text-xl'>Cargando datos...</p>;
  }

  return (
    <div className="">
      <span className='text-xl mr-4'>Precio Actual :{' '}{ forexData.valor}</span>
      <span style={{ color: forexData.color }}>{forexData.cambio}{' '}({forexData.cambioPorcentaje})%</span>
    </div>
  );
};

export default CurrentData;

import React from 'react';

interface ForexData {
  timestamp: string;
  valor: number;
  cambio: number;
  cambioPorcentaje: number;
  color: string; // Use a semantic color name (e.g., 'success', 'warning', 'error')
  divisa: string;
}

const Notification: React.FC<ForexData> = ({ timestamp, valor, cambio, cambioPorcentaje, color, divisa }) => {
  return (
<div className="flex-col m-2 items-center w-full justify-center border-2 p-2" >
    <div className="flex items-center justify-center mb-1">
    <h3 className="notification-title text-sm">{divisa}</h3>

    </div>
    <div className="flex items-center justify-center   ">
    <p className="notification-text text-xs  hover:scale-110 transition-transform duration-300" style={{ color: color}}>
        Valor Actual: {valor} ({cambioPorcentaje}%)
        <br />
        Cambio: {cambio}
        <br />
        Fecha: {timestamp}
      </p>
    </div>
    
    </div>
  );
};

export default Notification;
import React, { useState } from 'react';

const CustomAlert = ({ message, type }: { message: string, type: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={`p-4 border-l-4 ${type === 'success' ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'} flex justify-between items-center`}>
          <span className="closebtn text-lg" onClick={handleClose}>&times;</span>
          <span className="font-semibold">{type === 'success' ? 'Success!' : 'Error!'}</span>
          <span>{message}</span>
        </div>
      )}
    </>
  );
};

export default CustomAlert;

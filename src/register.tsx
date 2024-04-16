import React, { useState } from 'react';
import { register } from './methods';
import { useGlobalContext } from './globalProvider';

const RegisterForm: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { toggleLogin } = useGlobalContext(); 
  const handleRegister = async () => {
    setIsFormValid(true);
     register(email,password,setError,name,lastName,confirmPassword,setIsFormValid,toggleLogin );
 
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4 text-white text-center">Registro</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      /> 
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
     
     />
      <button
        onClick={handleRegister}
        disabled={isFormValid}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Registrarse
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default RegisterForm;

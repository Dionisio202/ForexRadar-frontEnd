import  { useState } from 'react';
import LoginForm from './login';
import RegisterForm from './register';
import { useGlobalContext } from './globalProvider';
const Form = () => {
  const { showLogin, toggleLogin } = useGlobalContext(); 

  const toggleForm = () => {
    toggleLogin(); 
  };

  return (
    <div
    className="flex flex-col items-center justify-center min-h-screen"
    style={{
      backgroundImage: `url('src/assets/tra.png')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="w-full max-w-md p-8  rounded-lg shadow-md bg-gray-800">
      {showLogin ? <LoginForm /> : <RegisterForm />}
      <div className="flex justify-center">
  <button onClick={toggleForm} className="mt-4 text-sm text-blue-600 hover:underline">
    {showLogin ? '¿No tienes una cuenta? Regístrate aquí' : '¿Ya tienes una cuenta? Inicia sesión aquí'}
  </button>
</div>
    </div>
  </div>
  );
};

export default Form;

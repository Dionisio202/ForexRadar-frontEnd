import React, { useState } from 'react';
import { login } from './methods';
import { useNavigate } from 'react-router-dom';
const LoginForm: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
  login(email,password,setError ,navigate);
  };

  return (
    <div >
    
      <h2 className="text-xl font-semibold mb-4 text-white text-center">Login</h2>
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
      <button
        onClick={handleLogin}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Ingresar
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default LoginForm;

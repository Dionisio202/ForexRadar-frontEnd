import React, { useEffect, useState } from 'react';
import { getProfile } from './methods';
import AlarmaModal from './alarmModal';
import { useGlobalContext } from './globalProvider';

const ProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password] = useState('');
const { profile} = useGlobalContext(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profile) {
          setFirstName(profile.firstName);
          setLastName(profile.lastName);
          setEmail(profile.email);
        }
      } catch (error) {
        console.error('Error al obtener divisas:', error);
      }
    };

    fetchData(); 
  }, [profile]); 


  return (
    <div className="max-w-md mx-auto flex-col justify-center items-center p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          Nombre
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm "
            id="firstName"
            type="text"
            placeholder="Nombre"
            value={firstName}
           
            readOnly={true}
          />
         
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          Apellido
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm "
            id="lastName"
            type="text"
            placeholder="Apellido"
            value={lastName}
         
            readOnly={true}
          />
         
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Correo electrónico
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm "
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            readOnly={true}
          />
         
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm "
            id="password"
            type="password"
            placeholder="********"
            value={password}
            readOnly={true}
          />
         
        </div>
      </div>
      
<AlarmaModal />
    </div>
  );
};

export default ProfileForm;

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './globalProvider';
import { UpdateProfile, UpdateProfileLastname, updateUser } from './methods';
import { useNavigate } from 'react-router-dom';

const ProfilEdit = () => {
  // Estados para almacenar los valores de los campos
  const [firstName, setFirstName] = useState('');
  const [originalFirstName, setOriginalFirstName] = useState('');
  const [originalLastName, setOriginalLastName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [originalPassword, setOriginalPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');

  const { profile} = useGlobalContext(); 
  const { setProfile} = useGlobalContext(); 
  const [showConfirmationDialogName, setShowConfirmationDialogName] = useState(false); 
  const [showConfirmationDialogLastName, setShowConfirmationDialogLastName] = useState(false); 
  const [showConfirmationDialogEmail, setShowConfirmationDialogEmail] = useState(false); 
  const [showConfirmationDialogPassword, setShowConfirmationDialogPassword] = useState(false); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profile) {
          setOriginalFirstName(profile.firstName);
          setOriginalLastName(profile.lastName);
          setOriginalEmail(profile.email);
          setFirstName(profile.firstName);
          setLastName(profile.lastName);
          setEmail(profile.email);
          const passwordd = localStorage.getItem('password') ?? '';
          setOriginalPassword(passwordd);
        }
      } catch (error) {
        console.error('Error al obtener divisas:', error);
      }
    };

    fetchData(); 
  }, [profile]); 

  const handleFirstNameChange = (e:any) => {
    const value = e.target.value.replace(/[0-9]/g, '');
    setFirstName(value);
    
  };

  const handleLastNameChange = (e:any) => {
    const value = e.target.value.replace(/[0-9]/g, '');
    setLastName(value);
  };

  const handleEmailChange = (e:any) => {
    
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  ///Name
  const openConfirmationDialogName = () => {
    setShowConfirmationDialogName(true);
  };
  const handleConfirmationName = () => {
    const id = localStorage.getItem('userId') ?? '';
    UpdateProfile(firstName,id,setProfile);
    setShowConfirmationDialogName(false); 
  };

  const handleCancelName = () => {
    setShowConfirmationDialogName(false); 
  };
  ///Lastname
  const openConfirmationDialogLastName = () => {
    const id = localStorage.getItem('userId') ?? '';
    UpdateProfileLastname(lastName,id,setProfile);
    setShowConfirmationDialogLastName(true);
  };
  const handleConfirmationLastName = () => {

    setShowConfirmationDialogLastName(false); 
  };

  const handleCancelLastName = () => {
    setShowConfirmationDialogLastName(false); 
  };
  ///Email
  const openConfirmationDialogEmail = () => {
    setShowConfirmationDialogEmail(true);
  };
  const handleConfirmationEmail = () => {
    
    setShowConfirmationDialogEmail(false); 
  };

  const handleCancelEmail = () => {
    setShowConfirmationDialogEmail(false); 
  };
  ///Password
  const openConfirmationDialogPassword= () => {
    setShowConfirmationDialogPassword(true);
  };
  const handleConfirmationPassword = () => {
    const passwordd = localStorage.getItem('password') ?? '';
    if(passwordCurrent==passwordd && password.length>=6){
      updateUser(email,password,passwordCurrent);
    }else if(passwordCurrent!=passwordd){
      alert('La contraseña actual no coincide');
      navigate(' ');
    }else if(password.length<6){
      alert('La contraseña debe tener al menos 6 caracteres');

    }
    
    setShowConfirmationDialogPassword(false); 
  };

  const handleCancelPassword= () => {
    setShowConfirmationDialogPassword(false); 
  };
  //PasswordCurrent
  const handlePasswordCurrentChange = (e:any) => {
    setPasswordCurrent(e.target.value);
    
  };

  const isFirstNameChanged = originalFirstName !== firstName;
  const isFirstLastName = originalLastName !== lastName;
  const isFirstPassword = originalPassword !== password;

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          Nombre
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={handleFirstNameChange}
           
          />
          <button className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          onClick={openConfirmationDialogName}  disabled={!isFirstNameChanged}>
            Editar
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          Apellido
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <button className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={openConfirmationDialogLastName} disabled={!isFirstLastName}>
            Editar
          </button>
        </div>
      </div>
     
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Nueva Contraseña
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          onClick={openConfirmationDialogPassword} disabled={!isFirstPassword}>
            Editar
          </button>
        </div>
      
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Contraseña Actual 
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={passwordCurrent}
            onChange={handlePasswordCurrentChange}
          />
          
        </div>
      </div>
      {showConfirmationDialogName && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded">
            <p>¿Estás seguro de que quieres cambiar el Nombre?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-4" onClick={handleConfirmationName}>Confirmar</button>
              <button onClick={handleCancelName}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
        {showConfirmationDialogLastName && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded">
            <p>¿Estás seguro de que quieres cambiar el Apellido?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-4" onClick={handleConfirmationLastName}>Confirmar</button>
              <button onClick={handleCancelLastName}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
        {showConfirmationDialogEmail && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded">
            <p>¿Estás seguro de que quieres cambiar el Email?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-4" onClick={handleConfirmationEmail}>Confirmar</button>
              <button onClick={handleCancelEmail}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
        {showConfirmationDialogPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded">
            <p>¿Estás seguro de que quieres cambiar la Contraseña?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-4" onClick={handleConfirmationPassword}>Confirmar</button>
              <button onClick={handleCancelPassword}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilEdit;

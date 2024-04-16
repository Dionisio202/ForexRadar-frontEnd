import axios, { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

export const register = async (
  email: string,
  password: string,
  setError: any,
  name: string,
  lastName: string,
  confirmPassword: string,
  setIsFormValid: Dispatch<SetStateAction<boolean>>,
  toggleLogin: () => void
) => {
  // Verificar si algún campo está vacío
  if (!email || !password || !name || !lastName || !confirmPassword) {
    alert('Todos los campos son obligatorios.');
    setIsFormValid(false);
    return;
  }

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    setIsFormValid(false);
    return;
  }

  try {
    // Construir la URL con los parámetros como cadena de consulta
    const url = `http://127.0.0.1:8000/user/register/?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(
      name
    )}&lastName=${encodeURIComponent(lastName)}`;

    const response = await axios.post(url);

    if (response.status === 200) {
      // Registro exitoso
      console.log('Registro exitoso:', response.data);
      toggleLogin();
      setIsFormValid(false);
      // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
    } else if (response.status === 429) {
      // Manejar otros códigos de estado aquí si es necesario
      setError('Limite de registros exedidos, por favor intenta mas tarde.');
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<{ error: { msg: string } }>;
    if (axiosError.response && axiosError.response.data) {
      console.error('Error al registrar:', axiosError.response.data);
      setError(axiosError.response.data);
      setIsFormValid(false);
    }else{
      setError('Error al registrar, por favor inténtalo de nuevo.');
      setIsFormValid(false);
    } 

  }
};


  export const login= async (email:String,password:String,setError:any,navigate:any) => {
    if (!email || !password ) {
        alert('Todos los campos son obligatorios.');
        return;
      }    
 
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/login/', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Registro exitoso, puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        setError('Ingreso exitoso ');
        navigate('/home');
      } 
    } catch (error: any) {
      const axiosError = error as AxiosError<{ error: { msg: string } }>;
      if (axiosError.response && axiosError.response.data) {
        setError(axiosError.response.data.error);
 
      }else{
        setError('Error al iniciar sesion, por favor inténtalo de nuevo.');

      } 
    }
  };
import axios, { AxiosError, AxiosResponse } from 'axios';
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

        const userId = response.data.token;
        localStorage.setItem('userId', userId);
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

  ///////////////////Divisa Information //////////////////////
  export interface Divisa {
    nombre: string;
    imagen1: string;
    imagen2: string;
    id: number;
  }
  
  // Método para obtener datos y almacenarlos en un array
  export const fetchDivisas = async (): Promise<Divisa[]> => {
    try {
      const url = 'http://127.0.0.1:8000/divisa/divisaInformation/';
  
      // Realizar la solicitud GET para obtener los datos
      const response: AxiosResponse<Divisa[]> = await axios.get(url);
  
      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        // Obtener los datos de la respuesta
        const divisas: Divisa[] = response.data;
        return divisas;
      } else {
        // La solicitud falló con un código de estado no esperado
        console.error('Error al obtener datos de divisas:', response.statusText);
        return [];
      }
    } catch (error: any) {
      // Manejar errores de la solicitud
      const axiosError = error as AxiosError;
      console.error('Error al obtener datos de divisas:', axiosError.message);
      return [];
    }
  };

  export const insertDivisaUser= async (divisa:number,user:string) => {
    console.log(`ID seleccionado: ${divisa} y el usuario es ${user}`);

    try {
      const response = await axios.post('http://127.0.0.1:8000/divisa/insertarDivisaInformation/', {
        divisa_id: divisa.toString(),
        user_profile_id: user.toString(),
      });
    
      if (response.status === 200) {
        console.log('Divisa insertada:', response.data);
      }
    } catch (error:any ) {
      if (error.response && error.response.data) {
        // Error de la API
        //console.error('Error de la API:', error.response.data);
        alert('Divisa ya insertada porfavor seleccione otra');
      } 
    }
    
  };

  export const fetchDivisasDelete = async (): Promise<Divisa[]> => {
    try {
      const url = 'http://127.0.0.1:8000/divisa/obtenerDivisas/?user=c4ab36ae-614d-49d1-952b-3dfb025cb5fc';
  
      // Realizar la solicitud GET para obtener los datos
      const response: AxiosResponse<Divisa[]> = await axios.get(url);
  
      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        // Obtener los datos de la respuesta
        const divisas: Divisa[] = response.data;
        return divisas;
      } else {
        // La solicitud falló con un código de estado no esperado
        console.error('Error al obtener datos de divisas:', response.statusText);
        return [];
      }
    } catch (error: any) {
      // Manejar errores de la solicitud
      const axiosError = error as AxiosError;
      console.error('Error al obtener datos de divisas:', axiosError.message);
      return [];
    }
  };


   export const DeleteDivisa = async (userProfileId:string, divisaId:string) => {
    try {
      const url = `http://127.0.0.1:8000/divisa/eliminarDivisas/?user=${userProfileId}&divisa=${divisaId}`;
      
      const response = await axios.get(url);
      
      console.log(response.data); 
    } catch (error) {
      console.error('Error al eliminar divisa:', error);
    }
  };
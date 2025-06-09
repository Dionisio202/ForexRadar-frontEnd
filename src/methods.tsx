import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { createClient } from '@supabase/supabase-js';
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

    if (response.status === 200) {      console.log('Registro exitoso:', response.data);
      toggleLogin();
      setIsFormValid(false);
    } else if (response.status === 429) {
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


export const login = async (email: string, password: string, setError: any, setIsLogin: any) => {
  if (!email || !password) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/user/login/', {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const userId = response.data.user_id;  // <-- ahora sí correcto
      const email = response.data.email;     // <-- ahora sí correcto
      const token = response.data.token;     // <-- si quieres guardar el token también
      console.log('Ingreso exitoso:', response.data);
      localStorage.setItem('userId', userId);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password); // opcional
      localStorage.setItem('token', token); // opcional

      setError('Ingreso exitoso');
      setIsLogin(true);
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<{ error: { msg: string } }>;
    if (axiosError.response && axiosError.response.data) {
      if ((axiosError.response.data.error).toString() === 'invalid_grant') {
        setError('La contraseña o correo electrónico son incorrectos');
      } else {
        setError(axiosError.response.data.error.toString());
      }
    } else {
      setError('Error al iniciar sesión, por favor inténtalo de nuevo.');
    }
  }
};


  /////getProfile/////////////////////
  export const getProfile = async (id: string | undefined, setProfile: any) => {
  if (!id || isNaN(Number(id))) {
    console.error('ID inválido para getProfile:', id);
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/user/getProfile/', {
      id: Number(id),
    });

    if (response.status === 200) {
      const profileData = {
        email: localStorage.getItem('email') ?? '',
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        password: ''
      };
      setProfile(profileData);
      console.log('Perfil obtenido');
      console.log('Perfil:', response.data);
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<{ error: { msg: string } }>;
    if (axiosError.response && axiosError.response.data) {
      console.error('Error al obtener perfil:', axiosError.response.data);
    } else {
      console.error('Error al obtener perfil:', axiosError.message);
      console.log('error', error);
    }
  }
};

  /////////updateProfile/////////////////////
  export const UpdateProfile = async (newName:string,profileId:string,setProfile:any) => {
    try {
      if (!profileId || !newName) {
        alert('Debes proporcionar un ID de perfil y un nuevo nombre');
        return;
      }

      const supabaseUrl = 'https://dcvauwnbzpxhdgggpzsg.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdmF1d25ienB4aGRnZ2dwenNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTg1OTUwNCwiZXhwIjoyMDI3NDM1NTA0fQ.AMi6GxQIuajsWeL_WQLSFFsXAfOufTwIpaN4gJxb8G4';
      const client = createClient(supabaseUrl, supabaseKey);

      const { error } = await client
        .from('profile')
        .update({ name: newName })
        .eq('user_id', profileId);

      if (error) {
        alert('No se pudo actualizar el nombre del perfil');
        return;
      }

      // La actualización fue exitosa
      console.log('Nombre de perfil actualizado con éxito');
      getProfile(profileId,setProfile);
    } catch (e:any) {
      console.log(e.message);
    }
  };
  export const UpdateProfileLastname = async (newName:string,profileId:string,setProfile:any) => {
    try {
      if (!profileId || !newName) {
        alert('Debes proporcionar un ID de perfil y un nuevo nombre');
        return;
      }

      const supabaseUrl = 'https://dcvauwnbzpxhdgggpzsg.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdmF1d25ienB4aGRnZ2dwenNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTg1OTUwNCwiZXhwIjoyMDI3NDM1NTA0fQ.AMi6GxQIuajsWeL_WQLSFFsXAfOufTwIpaN4gJxb8G4';
      const client = createClient(supabaseUrl, supabaseKey);

      const { error } = await client
        .from('profile')
        .update({ last_name: newName })
        .eq('user_id', profileId);

      if (error) {
        alert('No se pudo actualizar el nombre del perfil');
        return;
      }

      // La actualización fue exitosa
      console.log('Nombre de perfil actualizado con éxito');
      getProfile(profileId,setProfile);
    } catch (e:any) {
      console.log(e.message);
    }
  };
///update pass word ///

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
        console.log('Datos de divisas obtenidos:', response.data);
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

  export const insertDivisaUser= async (divisa:number,user:string,setDivisas:any,setIsSpinner:any) => {
    console.log(`ID seleccionado: ${divisa} y el usuario es ${user}`);
    setIsSpinner(false)
    try {
      const response = await axios.post('http://127.0.0.1:8000/divisa/insertarDivisaInformation/', {
        divisa_id: divisa.toString(),
        user_profile_id: user.toString(),
      });
    
     
      if (response.status === 200) {
        console.log('Divisa insertada:', response.data);
        const data = await fetchDivisasDelete(user);
        setDivisas(data);
        setIsSpinner(true)
      }
    } catch (error:any ) {
      if (error.response && error.response.data) {
        // Error de la API
        //console.error('Error de la API:', error.response.data);
        alert('Divisa ya insertada porfavor seleccione otra');
        setIsSpinner(true)
      } 
    }
    
  };

  export const fetchDivisasDelete = async (userId: string): Promise<Divisa[]> => {
    try {
      const url = `http://127.0.0.1:8000/divisa/obtenerDivisas/?user=${userId}`;  
      // Realizar la solicitud GET para obtener los datos
      const response: AxiosResponse<Divisa[]> = await axios.get(url);
  
      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        // Obtener los datos de la respuesta
        const divisas: Divisa[] = response.data;
        console.log('Datos de divisas obtenidos elimi:', response.data);
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


   export const DeleteDivisa = async (userProfileId:string, divisaId:string,setDivisas:any,setGlobaldivisaName:any,setIsSpinner:any) => {
    setIsSpinner(false)
    try {
      const url = `http://127.0.0.1:8000/divisa/eliminarDivisas/?user=${userProfileId}&divisa=${divisaId}`;
      
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log('Divisa eliminada:', response.data);
      
        const data = await fetchDivisasDelete(userProfileId);
        setDivisas(data);
        setGlobaldivisaName('');
        setIsSpinner(true)
      } else {
        // La solicitud falló con un código de estado no esperado
        console.error('Error al eliminar divisas', response.statusText);
        return [];
      }
     
    } catch (error) {
      console.error('Error al eliminar divisa:', error);
     
    }
  };
  const supabaseUrl = 'https://dcvauwnbzpxhdgggpzsg.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdmF1d25ienB4aGRnZ2dwenNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTg1OTUwNCwiZXhwIjoyMDI3NDM1NTA0fQ.AMi6GxQIuajsWeL_WQLSFFsXAfOufTwIpaN4gJxb8G4';
  const client = createClient(supabaseUrl, supabaseKey);
  
  export const updateUser = async (email:string, newPassword:string ,oldpassword:string) => {
    console.log('Cambiando contraseña... '+oldpassword);
    try {
      const { error } = await client.auth.signInWithPassword({
        email: email,
        password: oldpassword,
      });
      const updateResponse = await client.auth.updateUser({
        password: newPassword,
        email: email,
      });
  
    console.log('Usuario actualizado con éxito:', updateResponse);
    if(updateResponse.error){
      alert('Error al cambiar la contraseña , limite de intentos exedidos');
    }else{
      alert('Contraseña cambiada con éxito');
      await client.auth.signOut();
    }
     } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
   
    }

  };

 
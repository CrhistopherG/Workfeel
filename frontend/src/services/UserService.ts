import { safeParse } from "valibot";
import axios from "axios";
import { DraftUserSchema, UsersSchema } from "../types";

export type UserData = {
  name: string;
  password: string;
  email: string;
  rol_id: number;
}


const API_URL = import.meta.env.VITE_API_URL;
const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
};

// Helper para manejar errores
const handleApiError = (error: any) => {
  const message = error.response?.data?.message || error.message || "Error en la operación";
  console.error("Error detallado:", error.response?.data || error);
  throw new Error(message);
};


export async function addUser(data: UserData) {
  try {
    const result = safeParse(DraftUserSchema, data);
    if (!result.success) throw new Error('Datos no válidos');

    const response = await axios.post(`${API_URL}/api/users`, {
      name: result.output.name,
      password: result.output.password,
      email: result.output.email,
      rol_id: result.output.rol_id
    }, axiosConfig);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getUsers(){
  try {
      const url = `${import.meta.env.VITE_API_URL}/api/users`
      const { data } = await axios(url)        
      const result = safeParse(UsersSchema, data.data)
      if(result.success) {
          return result.output
      } else {
          throw new Error('Hubo un error...')
      }
      
  } catch (error) {
      console.log(error);
      
  }
}


export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/login`, 
      { email, password },
      axiosConfig
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Login fallido");
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (name: string, password: string, email: string) => {
  try {
    // Validación básica
    if (!email.includes('@')) throw new Error('Email inválido');
    if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres');
    
    const response = await axios.post(
      `${API_URL}/api/register`,
      { name, password: password, email },
      axiosConfig
    );

    console.log('Registro exitoso:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
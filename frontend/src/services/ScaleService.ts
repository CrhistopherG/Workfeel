import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/scale`;

// Obtener todas las escalas/opciones
export const getScales = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

// Obtener escalas/opciones por pregunta
export const getScalesByQuestion = async (question_id: number) => {
  const response = await axios.get(`${API_URL}/${question_id}`);
  return response.data.data;
};

// Obtener una escala/opción por su ID
export const getScaleById = async (scale_id: number) => {
  const response = await axios.get(`${API_URL}/${scale_id}`);
  return response.data.data;
};

// Crear una o varias escalas/opciones
export const createScale = async (scales: any[]) => {
  const response = await axios.post(API_URL, scales);
  return response.data.data;
};

// Actualizar una escala/opción
export const updateScale = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data.data;
};

// Eliminar una escala/opción
export const deleteScale = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


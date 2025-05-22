import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/question`; // <-- debe ser plural según tu backend

export const createQuestion = async (data: {
  content: string;
  dimension_id: number;
}) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear la pregunta:', error.response?.data || error.message);
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener preguntas:', error.response?.data || error.message);
    throw error;
  }
};

export const getActiveQuestions = async () => {
  const url = `${import.meta.env.VITE_API_URL}/api/question/activas`;
  const response = await axios.get(url);
  return response.data;
};

export const getActiveDimensions = async () => {
  const url = `${import.meta.env.VITE_API_URL}/api/dimension/activas`;
  const response = await axios.get(url);
  return response.data.data; // Asegúrate que el backend responde con { data: [...] }
};


// Actualizar pregunta
export const updateQuestion = async (
  id: number,
  data: { content: string; dimension_id: number }
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar la pregunta:', error.response?.data || error.message);
    throw error;
  }
};

// Eliminar pregunta
export const deleteQuestion = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al eliminar la pregunta:', error.response?.data || error.message);
    throw error;
  }
};


export const getQuestions1 = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // <-- Solo el array de preguntas
  } catch (error: any) {
    console.error('Error al obtener preguntas:', error.response?.data || error.message);
    throw error;
  }
};
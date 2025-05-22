import axios from "axios";
import { safeParse } from "valibot";
import { DraftDimensionSchema, DimensionsSchema } from "../types";
import { useAuth } from "../context/AuthContext";
// Tipado para datos de dimensión
type DimensionData = {
  name: string;
  description: string;
  status?: boolean | number | string;
  period_id?: number;
};

export type { DimensionData };

// Agregar dimensión
export async function addDimension(data: DimensionData) {
  try {
    const cleanStatus =
      data.status === true || data.status === "true" || data.status === 1;

    const result = safeParse(DraftDimensionSchema, {
      ...data,
      status: cleanStatus,
    });

    console.log("Resultado de validación:", result);

    if (!result.success) {
      console.error("Error de validación:", result.issues);
      throw new Error("Datos no válidos");
    }

    const url = `${import.meta.env.VITE_API_URL}/api/dimension`;
    const { data: response } = await axios.post(url, {
      name: result.output.name,
      description: result.output.description,
      status: result.output.status,
      period_id: result.output.period_id ?? 1,
    });

    console.log("Respuesta API:", response);
    return response;
  } catch (error) {
    console.log(error);
    return "Hubo un problema al registrar la dimensión";
  }
}

// Obtener todas las dimensiones
export async function getDimension() {
  
  try {
    
    const url = `${import.meta.env.VITE_API_URL}/api/dimension`;
    const { data } = await axios(url);
    console.log("Respuesta completa de la API:", data); // <-- Ver estructura real
    
    // Verifica si los datos están en data.data o directamente en data
    const rawData = data.data || data;
    
    const result = safeParse(DimensionsSchema, rawData);
    if (result.success) {
      // Normalizar status de manera más robusta
      const cleanData = result.output.map((dim: any) => ({
        ...dim,
        status: Boolean(
          dim.status === true || 
          dim.status === 'true' || 
          dim.status === 1 || 
          dim.status === '1' ||
          dim.status === 'abierto' ||
          dim.status === 'Abierto'
        ),
      }));
      console.log("Datos normalizados:", cleanData); // <-- Ver resultado
      return cleanData;
    } else {
      console.error("Error en getDimension", result.issues);
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.error("Error en getDimension:", error);
    return "Hubo un problema al mostrar las dimensiones";
  }
}


// Eliminar dimensión
export async function deleteDimension(id: number) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/dimension/${id}`;
    const { data } = await axios.delete(url);
    return data;
  } catch (error) {
    console.log(error);
    return "Hubo un problema al eliminar la dimensión";
  }
}

// Actualizar dimensión
export async function updateDimension(id: number, data: DimensionData) {
  try {
    const cleanStatus = Boolean(
      data.status === true || 
      data.status === "true" || 
      data.status === 1 || 
      data.status === "1"
    );

    const result = safeParse(DraftDimensionSchema, {
      ...data,
      status: cleanStatus,
    });

    if (!result.success) {
      throw new Error("Datos no válidos");
    }

    const url = `${import.meta.env.VITE_API_URL}/api/dimension/${id}`;
    console.log("URL de actualización:", url);

    const { data: response } = await axios.put(url, {
      name: result.output.name,
      description: result.output.description,
      status: result.output.status,
      period_id: result.output.period_id ?? 1,
    });

    console.log("Respuesta del servidor:", response);
    return response;
  } catch (error) {
    console.error("Error en updateDimension:", error);
    throw error;
  }
}


// Obtener dimensión por ID
export async function getDimensionById(id: number) {
  const url = `${import.meta.env.VITE_API_URL}/api/dimension/${id}`;
  const { data } = await axios.get(url);
  return data;
}

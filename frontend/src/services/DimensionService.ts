import axios from "axios";
import { safeParse } from "valibot";
//importamos el index.ts de dimensione
import { DraftDimensionSchema, DimensionsSchema } from "../types";
import { useState } from "react";

type DimensionData = {
    name: string;
    description: string;
    status: boolean;
    period_id?: number; // <-- aquí, no period_id

}

//exportamos el dimension data
export type { DimensionData }

//creamos la funcion para agregar las dimensiones
export async function addDimension(data: DimensionData) {
    try {
        const result = safeParse(DraftDimensionSchema, data)
        console.log("Resultado de validación:", result)
        if (!result.success) {
            console.error("Error de validación:", result.issues);
            throw new Error("Datos no válidos")
        }

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/dimension`
            const { data } = await axios.post(url, {
                name: result.output.name,
                description: result.output.description,
                status: result.output.status,
                period_id: result.output.period_id
            })
            console.log("Respuesta API:", data)
        }
        else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error);
        return "Hubo un problema al registrar la dimension"
    }
}


export async function getDimension() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/dimension`;
        const { data } = await axios(url);
        // Usa DimensionsSchema (array), no DimensionSchema (objeto)
        const result = safeParse(DimensionsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.log("Error en getDimension", result.issues);
            throw new Error('Hubo un error...');
        }
    } catch (error) {
        console.log(error);
        return "Hubo un problema al mostrar las dimensiones";
    }
}

//funcion para eliminar dimensiones
export async function deleteDimension(id: number) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/dimension/${id}`;
        const { data } = await axios.delete(url);
        return data;
    } catch (error) {
        console.log(error);
        return "Hubo un problema al eliminar la dimension";
    }
}


// función para editar dimensiones
export async function updateDimension(id: number, data: DimensionData) {
    try {
        // NO uses useState aquí
        console.log('Datos enviados a updateDimension:', data)
        const result = safeParse(DraftDimensionSchema, data)
        if (!result.success) {
            console.error("Error de validación:", result.issues)
            throw new Error("Datos no válidos")
        }
        const url = `${import.meta.env.VITE_API_URL}/api/dimension/${id}`;
        const { data: response } = await axios.put(url, {
            name: result.output.name,
            description: result.output.description,
            status: result.output.status,
            period_id: result.output.period_id ?? 1 // Valor por defecto si viene undefined
        });
        return response;
    } catch (error) {
        console.log(error);
        return "Hubo un problema al actualizar la dimensión";
    }
}

//funcion para obtener una dimension por id
export async function getDimensionById(id: number) {
  const url = `${import.meta.env.VITE_API_URL}/api/dimension/${id}`
  const { data } = await axios.get(url)
  return data
}
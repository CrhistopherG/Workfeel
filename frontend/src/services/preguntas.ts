import { safeParse } from "valibot";
import axios from "axios";
import {DrafQuestionSchema,QuestionSchema,QuestionsSchema} from "../types"

type questiondata={
    question_id:number;
    content:string;
    dimension_id:number;
}

export type {questiondata}


//utilizaremos el metodo get para visualizar los valores
export async function getquestion() {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/question`;
      const { data } = await axios.get(url);
  
      // Valida los datos obtenidos con el esquema
      const result = safeParse(QuestionsSchema, data.data);
  
      if (result.success) {
        return result.output; // Devuelve los datos validados
      } else {
        console.error("Error de validación:", result);
        throw new Error("Error al validar los datos obtenidos del servidor");
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      throw new Error("Error al obtener las preguntas");
    }
  }
    

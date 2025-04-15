import { safeParse } from "valibot";
import axios from "axios";
import { DrafScaleSchema, ScaleSchema, ScalesSchema } from "../types";


type ScaleData = {
    value: number;
    description: string;
}

//funcion para visualizar los datos
export async function getScale() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/scale`
        console.log("api conectada" , url);
        const { data } = await axios(url)
        const result = safeParse(ScalesSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
        return "Hubo un problema al mostrar las escalas"
    }
}


// export async function getUsers(){
//     try {
//         const url = `${import.meta.env.VITE_API_URL}/api/users`
//         const { data } = await axios(url)        
//         const result = safeParse(UsersSchema, data.data)
//         if(result.success) {
//             return result.output
//         } else {
//             throw new Error('Hubo un error...')
//         }
        
//     } catch (error) {
//         console.log(error);
        


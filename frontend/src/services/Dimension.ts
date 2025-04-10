import { description, safeParse } from "valibot";
import axios from "axios";
import { DimensionSchema, DimensionsSchema, DraftDimensionSchema } from "../types";


//empezamos a llamar nuetsro apy de nuetsro dimension
type dimensiondata={
    name:string
    description:string
    status:boolean
}
    



//metodos post para visualizar los datos de mi dimenison 
export async function getDimension(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/dimension`
        console.log("api buscado correctamente ")
        const {data}=await axios (url)
        const result =  safeParse(DimensionsSchema, data.data)

        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
                 
         }

        
    } catch (error) {
        console.log("datos no reconocido de la base de datos" , error)
        return("error de los datos no se reconocieron ")
    }
}
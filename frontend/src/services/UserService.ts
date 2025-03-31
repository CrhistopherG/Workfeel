import { safeParse } from "valibot";
import axios from "axios";
import { DraftUserSchema, UserSchema, UsersSchema } from "../types";

type UserData = {
    [k: string]: FormDataEntryValue;
}

export async function addUser(data: UserData){
    try {
        const result = safeParse(DraftUserSchema, data)
        
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/users`
            const { data } = await axios.post(url, {
                name: result.output.name,
                password: result.output.password,
                email: result.output.email
            })
        } else {
            throw new Error('Datos no validos')
        }
        
    } catch (error) {
        console.log(error);
        
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
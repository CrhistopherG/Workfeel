//implementamos nuestro company
import { safeParse } from "valibot";
import axios from "axios";
import { DraftCompanySchema, CompanysSchema } from "../types";

type CompanyData = {
    name: string;
    address: string;
    email: string;
    credits: number; // 👈 Ahora es number
};

//exportar el companydata
export type { CompanyData };

export async function addCompany(data: CompanyData) {
    try {
        const result = safeParse(DraftCompanySchema, data)
         console.log("Resultado de validación:", result) 
        if (!result.success) {
            console.error("Error de validación:", result.issues);
            throw new Error("Datos no válidos")
        }

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/company`
            const { data } = await axios.post(url, {
                name: result.output.name,
                address: result.output.address,
                email: result.output.email,
                credits: result.output.credits
            })
            
            console.log("Respuesta API:", data)
        }
        else {
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log(error);
        return "Hubo un problema al registrar la empresa"
    }

}

export async function getCompany() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/company`
        const { data } = await axios(url)
        const result = safeParse(CompanysSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }

    } catch (error) {
        console.log(error);
        return"Hubo un problema al mostrar las empresas"
    }
}


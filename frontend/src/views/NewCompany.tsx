import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addCompany } from "../services/CompanyService"
import { CompanyData } from "../services/CompanyService"; // Ajusta la ruta según dónde esté definido


export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());

const data = {
    name: formData.name as string,
    address: formData.address as string,
    email: formData.email as string,
    credits: Number(formData.credits) || 0,  // 👈 Convertimos `credits` a número
} as unknown as CompanyData;


    
    //convertimos credits como number
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }
    await addCompany(data)
    return redirect('/empresa')
}
//             type="submit"
const NewCompany = () => {
    const error = useActionData() as string
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate 500">Registrar usuario</h2>
                <Link
                    to="/empresa"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
                >
                    Volver a empresas
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form action="" method="POST" className="mt-10">
                <div className="mb-4">
                    <label htmlFor="name" className="text-gray-800">
                        Nombre empresa
                    </label>
                    <input id="name" type="text" className="mt-2 block w-full p-3 bg-gray-50" name="name" />

                </div>
                <div>
                    <label htmlFor="address" className="text-gray-800">
                        Dirección
                    </label>
                    <input id="address" type="text" className="mt-2 block w-full p-3 bg-gray-50" name="address" />
                </div>
                <div>
                    <label htmlFor="email" className="text-gray-800">
                        Correo
                    </label>
                    <input id="email" type="email" className="mt-2 block w-full p-3 bg-gray-50" name="email" />
                </div>
                <div>
                    <label htmlFor="credits" className="text-gray-800">
                        Créditos
                    </label>
                    <input id="credits" type="number" className="mt-2 block w-full p-3 bg-gray-50" name="credits" />
                </div>
                <input
                    type="submit"
                    value="Registrar empresa"
                    className="mt-5 w-full bg-indigo-600 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-indigo-500 transition-colors"
                />
            </Form>
        </>
    )
}

export default NewCompany

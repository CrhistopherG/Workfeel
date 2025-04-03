import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addUser } from "../services/UserService"

export async function action({request} : ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    await addUser(data)

    return redirect('/')
 }

export default function NewUser() {

    const error = useActionData() as string
    

  return (
    <>
        <div className="flex justify-around w-full">
            <h2 className="text-4xl font-black text-slate 500">Registrar usuario</h2>
            <Link 
                to="/"
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
            >
                Volver a usuarios
            </Link>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form className="mt-10 w-3xl" method='POST' action="">
            <div className="mb-4">
                <label htmlFor="name" className="text-gray-800">
                Nombre usuario
                </label>
                <input id="name" type="text" className="mt-2 block w-full p-3 bg-gray-50" name="name"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="text-gray-800">
                Contraseña
                </label>
                <input id="password" type="password" className="mt-2 block w-full p-3 bg-gray-50" name="password"/>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                Correo
                </label>
                <input id="email" type="email" className="mt-2 block w-full p-3 bg-gray-50" name="email"/>
            </div>

            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Registrar usuario"
            />



        </Form>
    </>
  )
}

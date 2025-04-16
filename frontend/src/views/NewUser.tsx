import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom"
import { useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import { addUser, UserData } from "../services/UserService"

export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());
  
    // Convertimos el campo "rol" a número y lo renombramos como "rol_id"
    const data = {
      ...formData,
      rol_id: parseInt(formData.rol_id as string, 10),
    };
  
    // Validación
    let error = '';
    if (Object.values(formData).includes('') || isNaN(data.rol_id)) {
      error = 'Todos los campos son obligatorios';
    }
    if (error.length) {
      return error;
    }
  
    await addUser(data as UserData);
    return redirect('/panel_administrativo/usuarios/ver_todos');
  }
  

export default function NewUser() {
  const error = useActionData() as string
  const [selectedRole, setSelectedRole] = useState<number>()

  return (
    <>
      <div className="flex justify-around w-full">
        <h2 className="text-4xl font-black text-slate-500">Registrar usuario</h2>
        <Link
          to="/panel_administrativo/usuarios/ver_todos"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Ver usuarios
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10 w-5xl" method='POST' action="">
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-800">Nombre usuario</label>
          <input id="name" type="text" className="mt-2 block w-full p-3 bg-gray-50" name="name" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-800">Contraseña</label>
          <input id="password" type="password" className="mt-2 block w-full p-3 bg-gray-50" name="password" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-800">Correo</label>
          <input id="email" type="email" className="mt-2 block w-full p-3 bg-gray-50" name="email" />
        </div>

        <div className="mb-4">
          <label htmlFor="rol" className="text-gray-800">Rol</label>
          <select
            id="rol_id"
            name="rol_id"
            value={selectedRole}
            onChange={(e) => setSelectedRole(+e.target.value)}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded"
          >
            <option value="">-- Seleccione un rol --</option>
            <option value="1">Master</option>
            <option value="2">Administrador</option>
          </select>
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

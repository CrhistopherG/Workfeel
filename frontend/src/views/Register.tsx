import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import { addUser, UserData } from "../services/UserService";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const data = {
    ...formData,
    rol_id: 2,
  };

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

export default function Register() {
  const error = useActionData() as string;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-gray-500 font-bold text-3xl tracking-widest mb-2">Registrar Usuario</h1>
          <p className="text-sm text-gray-600">
            Llena el siguiente formulario para crear un nuevo usuario
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Form method="POST" action="" className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrar usuario
            </button>
          </div>
        </Form>

        <div className="text-sm text-center text-gray-600">
          <Link
            to="/login"
            className="font-medium text-blue-600 underline hover:text-blue-500"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

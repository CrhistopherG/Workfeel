import { Link, useLoaderData } from "react-router-dom"
import { getUsers } from "../services/UserService"
import UserDetails from "../components/UserDetails"
import type { User } from "../types"

export async function loader(){

  const users = await getUsers()
  
  return users
}

export default function User() {

  const users = useLoaderData() as User[]
  

  return (
    <>
        <div className="flex justify-around w-full">
            <h2 className="text-4xl font-black text-slate 500">Usuarios</h2>
            <Link 
                to="usuario/nuevo"
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
            >
                Agregar usuario
            </Link>
        </div>

        <div className="p-2 w-3xl h-auto">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-2">Usuario</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Empresa</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                  <UserDetails 
                    key={user.user_id}
                    user={user}
                  />
                ))}
            </tbody>
          </table>
        </div>

    </>
  )
}

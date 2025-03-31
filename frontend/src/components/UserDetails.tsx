import { User } from "../types"

type UserDetailsProps ={
    user: User
}

export default function UserDetails({user} : UserDetailsProps) {
  return (
    <tr className="border-b text-center">
        <td className="p-3 text-lg text-gray-800">
            {user.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {user.email}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {user.rol_id}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {user.company_id === null ? 'Sin asignar' : user.company_id}
        </td>
    </tr>
  )
}

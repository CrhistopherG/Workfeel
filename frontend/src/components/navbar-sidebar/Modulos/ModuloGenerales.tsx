import { Link } from "react-router-dom";


export default function ModuloGenerales() {
  return (
    <>
        <li>
        <Link
            to="/generales/lista_puestos"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
            Lista de puestos
        </Link>
        </li>
        <li>
        <Link
            to="/generales/plan_accion"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
            Plan de acción
        </Link>
        </li>
        <li>
        <Link
            to="/generales/configuraciones"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
            Configuraciones
        </Link>
        </li>  
    </>
  )
}

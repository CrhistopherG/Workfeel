import { Link } from "react-router-dom";


export default function ModuloResultados() {
  return (
    <>
        <li>
            <Link
            to="/resultados/resultado"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
            Resultado
            </Link>
        </li>
        <li>
            <Link
            to="/resultados/niveles_satisfaccion"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
            Niveles de satisfacción
            </Link>
        </li>
        <li>
            <Link
            to="/resultados/comparar_periodos"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
            Comparar periodos
            </Link>
        </li> 
    </>
  )
}

import { Link } from "react-router-dom";

export default function Modulo_Encuestas() {
  return (
    <>
     <li>
        <Link
        to="/encuestas/dimensiones"
        className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
        Dimensiones
        </Link>
    </li>
    <li>
        <Link
        to="/encuestas/preguntas"
        className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
        Preguntas
        </Link>
    </li>
    <li>
        <Link
        to="/encuestas/escalas"
        className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
        Escalas
        </Link>
    </li> 
    </>
  )
}

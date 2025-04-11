import React from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoFileTrayFullSharp } from "react-icons/io5";

export async function loader() {
  console.log('Desde loader dimension...');
  
}

const Dimensiones = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="py-4">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-500">
            <li>
              <Link to="/dimensiones" className="flex items-center hover:text-gray-700">
                <CiUser className="mr-1" />
                Dimensiones
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700">Dimensiones</li>
          </ol>
        </nav>
      </div>

      {/* Indicaciones */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
        <p className="text-gray-600 text-center">
          Indicaciones: En este módulo podrás consultar los resultados de los periodos evaluados.
          En todos los casos, los resultados mostrados son promedios aritméticos. Podrás seleccionar
          el filtro de acuerdo a tus necesidades. Primero deberás seleccionar el periodo y después
          podrás seleccionar los criterios que deseas filtrar.
        </p>
      </div>

      {/* Dropdown de Dimensiones */}
      <div className="bg-white border rounded-md shadow-md p-4 mb-6">
        <div className="bg-gray-600 text-gray text-center py-2 rounded-t-md">
          <p className="text-lg font-semibold">Dimensiones o Áreas</p>
        </div>
        <div className="relative mt-4">
          <button
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center justify-between hover:bg-gray-300"
            type="button"
          >
            <IoFileTrayFullSharp className="mr-2" />
            Seleccionar Dimensión
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul className="absolute w-full bg-white border rounded-md shadow-md mt-2 hidden">
            {[
              "Ver todos",
              "Trabajo en equipo",
              "Ambiente laboral",
              "Desarrollo personal",
            ].map((item) => (
              <li key={item}>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabla de Dimensiones */}
      <div className="bg-white border rounded-md shadow-md p-4">
        <div className="flex justify-between items-center bg-gray-600  text-black px-4 py-2 rounded-t-md">
          <span className="font-semibold">Dimensiones o Áreas</span>
          <div className="flex items-center">
            <span className="mr-2">Activo</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative">
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
              </div>
            </label>
          </div>
        </div>
        <table className="w-full mt-4 text-left border-collapse">
          <thead className="bg-gray-600  text-black">
            <tr>
              <th className="px-4 py-2">Orden</th>
              <th className="px-4 py-2">Dimensiones o Áreas</th>
              <th className="px-4 py-2 text-center">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes agregar filas dinámicamente */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dimensiones;

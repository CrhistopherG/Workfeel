import React from "react";
import { Link } from "react-router-dom";
import { MdHelpOutline } from "react-icons/md";
import { IoFileTrayFullSharp } from "react-icons/io5";

const Preguntas = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Navegación */}
      <div className="py-4">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-500">
            <li>
              <Link to="/dimensiones" className="flex items-center hover:text-blue-600">
                <MdHelpOutline className="mr-1 text-blue-500" />
                Dimensiones
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800 font-medium">Preguntas</li>
          </ol>
        </nav>
      </div>

      {/* Instrucciones */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Indicaciones: En este módulo podrás agregar, editar y eliminar preguntas de tu encuesta.
          Además, tendrás la flexibilidad de personalizarla según tus necesidades.
        </p>
      </div>

      {/* Botones de Exportar */}
      <div className="flex justify-end mb-4">
        <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Exportar a Excel
        </button>
      </div>

      {/* Filtros y Buscador */}
      <div className="bg-white border rounded-md shadow-md p-4 mb-6">
        <div className="bg-gray-600 text-white text-center py-2 rounded-t-md">
          <p className="text-lg font-semibold">Filtrar por grupo</p>
        </div>
        <div className="relative mt-4">
          <button
            className="w-full bg-blue-100 text-white-700 py-2 px-4 rounded-md flex items-center justify-between hover:bg-blue-200"
            type="button"
          >
            <IoFileTrayFullSharp className="mr-2" />
            Seleccionar grupo
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
          <ul className="absolute w-full bg-white border rounded-md shadow-md mt-2 hidden group-hover:block">
            {["Ver todos", "Trabajo en equipo", "Ambiente laboral", "Desarrollo personal"].map(
              (item) => (
                <li key={item}>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-700">
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-4">
        <div className="flex justify-between items-center bg-gray-600 text-white px-4 py-2 rounded-t-md">
          <span className="font-semibold">Preguntas Activas</span>
          <div className="w-1/2">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Buscar preguntas..."
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 rounded-md shadow-md">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2 border border-gray-300">#</th>
                <th className="px-4 py-2 border border-gray-300">Dimensiones</th>
                <th className="px-4 py-2 border border-gray-300">Pregunta</th>
                <th className="px-4 py-2 border border-gray-300">Configuración de pregunta</th>
                <th className="px-4 py-2 border border-gray-300">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí puedes agregar filas dinámicamente */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Preguntas;
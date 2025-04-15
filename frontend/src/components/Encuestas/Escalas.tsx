import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const Escala = () => {
  const [valor, setValor] = useState([
    { id: 1, orden: "1", descripcion: "Totalmente en desacuerdo", valor: "1" },
    { id: 2, orden: "2", descripcion: "En desacuerdo", valor: "2" },
    { id: 3, orden: "3", descripcion: "Ni de acuerdo ni en desacuerdo", valor: "3" },
    { id: 4, orden: "4", descripcion: "De acuerdo", valor: "4" },
    { id: 5, orden: "5", descripcion: "Totalmente de acuerdo", valor: "5" },
  ]);

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="py-4">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-500">
            <li>
              <Link to="/escala" className="flex items-center hover:text-blue-600">
                <CiUser className="mr-1 text-blue-500" />
                Escala
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800 font-medium">Escala</li>
          </ol>
        </nav>
      </div>

      {/* Indicaciones y botón */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 text-sm">
          En este módulo podrás agregar, editar y eliminar elementos de la escala. El valor asignado
          es utilizado para el cálculo de estadísticas.
        </p>
        <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Nuevo Criterio
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Orden</th>
              <th className="px-4 py-2 border border-gray-300">Descripción</th>
              <th className="px-4 py-2 border border-gray-300">Valor</th>
            </tr>
          </thead>
          <tbody>
            {valor.map((d) => (
              <tr key={d.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300 text-center">{d.orden}</td>
                <td className="px-4 py-2 border border-gray-300">{d.descripcion}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{d.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Indicaciones Adicionales */}
      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800">Indicaciones:</h2>
        <p className="text-gray-600">
          Selecciona la opción que mejor describa tu percepción para cada frase.
        </p>
      </div>

      {/* Sección de Radios */}
      <div className="border rounded-md p-4 mt-4">
        <h5 className="bg-gray-600 font-semibold text-center">COMUNICACIÓN EFICAZ</h5>
        <ol className="list-decimal list-inside mt-4">
          <li>
            Estoy informado(a) de los cambios en políticas y procedimientos de la organización.
          </li>
        </ol>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {valor.map((d) => (
            <label key={d.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="inlineRadioOptions"
                value={d.valor}
                className="form-radio bg-gray-600"
              />
              <span className="text-gray-700">{d.descripcion}</span>
            </label>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Obtener el valor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Escala;  
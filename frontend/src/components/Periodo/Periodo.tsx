import { useLoaderData } from "react-router-dom";
import { Period } from "../../types";
import PeriodDetails from "../PeriodDetails";
import { getPeriods } from "../../services/PeriodService";
import { BsExclamationTriangle } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

export async function loader() {
  try {
    const periods = await getPeriods();
    return periods.data;
  } catch (error) {
    console.error("Error cargando periodos:", error);
    return [];
  }
}

const Periodo = () => {
  const periods = useLoaderData() as Period[];

  // Modal control
  const [showModal, setShowModal] = useState(false);

  // Nuevo periodo
  const [newPeriod, setNewPeriod] = useState({
    name: "",
    date_start: "",
    date_end: "",
  });

  // Extraer company_id del localStorage
  const userData = localStorage.getItem("user");
  const companyId = userData ? JSON.parse(userData).company_id : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPeriod((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, date_start, date_end } = newPeriod;

    if (!name || !date_start || !date_end) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (new Date(date_start) >= new Date(date_end)) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin.");
      return;
    }

    try {
      await axios.post("http://localhost:5173/api/periods", {
        ...newPeriod,
        status: true,
        company_id: companyId,
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear periodo:", error);
      alert("Hubo un error al crear el periodo.");
    }
  };

  return (
    <>
      <div className="text-center">
        {/* Indicaciones */}
        <div className="flex flex-nowrap items-center w-full justify-between bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-xl text-justify me-8 ms-2">
            Indicaciones:<br />En este módulo podrás agregar, editar y eliminar
            periodos de evaluación. Solo se podrá tener un periodo activo a la
            vez. La fecha de inicio y cierre indica el tiempo en que el
            periodo estará activo. El estado del periodo indica si está activo
            o cerrado.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 min-w-auto text-nowrap text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Nuevo periodo
          </button>
        </div>

        {/* Buscador */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <div className="flex justify-end mb-4 items-center">
            <label htmlFor="search" className="mr-2 text-gray-600">
              Buscar:
            </label>
            <input
              type="text"
              id="search"
              className="border rounded px-2 py-1 text-gray-700 focus:ring focus:ring-blue-300"
              placeholder="Buscar..."
            />
          </div>

          {/* Tabla */}
          <table className="w-full border-2">
            <thead>
              <tr className="bg-gray-700 text-2xl text-white">
                <th className="py-2 px-4">Periodos</th>
                <th className="py-2 px-4">Estado</th>
                <th className="py-2 px-4">Fecha de inicio</th>
                <th className="py-2 px-4">Fecha de cierre</th>
                <th className="py-2 px-4">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(periods) && periods.length > 0 ? (
                periods.map((period) => (
                  <PeriodDetails key={period.period_id} period={period} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">
                    No hay periodos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: Nuevo Periodo */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4 text-left">
                Nuevo periodo
              </h2>
              <div className="mb-3">
                <label className="block text-left text-gray-700 mb-1">
                  Nombre del periodo
                </label>
                <input
                  type="text"
                  name="name"
                  value={newPeriod.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:ring"
                />
              </div>
              <div className="mb-3">
                <label className="block text-left text-gray-700 mb-1">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  name="date_start"
                  value={newPeriod.date_start}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:ring"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-1">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  name="date_end"
                  value={newPeriod.date_end}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:ring"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Crear periodo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Eliminar - placeholder */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center hidden"
          id="deleteModal"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex items-center mb-4">
              <BsExclamationTriangle
                className="text-yellow-500 mr-3"
                size={24}
              />
              <p className="text-gray-700">
                Este periodo será eliminado permanentemente. ¿Está seguro que
                desea eliminarlo?
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Eliminar
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Periodo;

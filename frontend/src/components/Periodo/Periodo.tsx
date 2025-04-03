
import { BsExclamationTriangle } from "react-icons/bs";

const Periodo = () => {
  return (
    <>
      <div className="text-center">
        {/* Indicaciones */}
        <div className="flex flex-nowrap items-center w-full justify-between bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-xl text-justify me-8 ms-2">
            Indicaciones:<br/> En este módulo podrás agregar, editar y eliminar
            periodos de evaluación, solo se podrá tener un periodo activo a la
            vez, la fecha de inicio y cierre indica el tiempo en que el
            periodo estará activo. El estado del periodo indica si está activo
            o se considera un periodo cerrado.
          </p>
          <button className="bg-blue-500 min-w-auto text-nowrap text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Nuevo periodo
          </button>
        </div>

        {/* Buscador */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <div className="flex justify-end mb-4 items-center content-center">
            <label htmlFor="search" className="mr-2 text-gray-600">Buscar:</label>
            <input
              type="text"
              id="search"
              className="border rounded px-2 py-1 text-gray-700 focus:ring focus:ring-blue-300"
              placeholder="Buscar..."
            />
          </div>
          {/* Tabla */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Periodos</th>
                <th className="py-2 px-4">Estado</th>
                <th className="py-2 px-4">Fecha de inicio</th>
                <th className="py-2 px-4">Fecha de cierre</th>
                <th className="py-2 px-4">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí van los datos */}
            </tbody>
          </table>
        </div>

        {/* Modal de eliminar periodo */}
        <div className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center hidden" id="deleteModal">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex items-center mb-4">
              <BsExclamationTriangle className="text-yellow-500 mr-3" size={24} />
              <p className="text-gray-700">
                Este periodo será eliminado permanentemente. ¿Está seguro que desea eliminarlo?
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Eliminar</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Periodo;

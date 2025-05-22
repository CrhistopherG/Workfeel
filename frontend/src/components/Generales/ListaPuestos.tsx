import { FaBuilding, FaEdit, FaSearch, FaTrash } from "react-icons/fa";


export default function ListaPuestos() {
  
  const puestos = [
    { id: 1, puesto: 'Jefe de Contabilidad Fiscal', departamento: 'Contabilidad' },
    { id: 2, puesto: 'Jefe de Soporte IT', departamento: 'Soporte IT' },
    { id: 3, puesto: 'Analista de Recursos Humanos', departamento: 'RRHH' },
  ];
  
  return (
    <>
      <main className="flex flex-col w-full gap-4">
        <section className="flex justify-around items-center">
          <h2 className="text-gray-500">Indicaciones: En este modulo podras agregar los puestos de tu empresa</h2>
          <button className="p-2 bg-blue-600 rounded-2xl text-white">Nuevo puesto</button>
        </section>

        <section className="w-full flex items-center gap-2 p-2 border rounded-md bg-white shadow-sm">
          {/* Dropdown de departamentos */}
          <details className="relative">
            <summary className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm">
              Seleccionar departamento
            </summary>
            <ul className="absolute left-0 mt-1 w-48 bg-white border rounded shadow z-10">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Ventas</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Marketing</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">TI</li>
            </ul>
          </details>

          {/* Input de búsqueda */}
          <form className="flex items-center border rounded-md overflow-hidden w-full max-w-md">
            <span className="px-2 text-gray-500">
              <FaSearch />
            </span>
            <input
              type="search"
              placeholder="Buscar por puestos"
              className="w-full px-2 py-2 text-sm outline-none"
            />
          </form>

          {/* Botón de mostrar todos */}
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition">
            <FaBuilding />
            Mostrar todos los puestos
          </button>
        </section>

        <section className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Puesto</th>
                <th className="px-4 py-2 text-left">Departamento</th>
                <th className="px-4 py-2 text-center">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {puestos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.puesto}</td>
                  <td className="px-4 py-2">{p.departamento}</td>
                  <td className="px-4 py-2 flex justify-center text-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                      <FaEdit className="inline-block" /> Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm">
                      <FaTrash className="inline-block" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


        
      </main>
    </>
  )
}

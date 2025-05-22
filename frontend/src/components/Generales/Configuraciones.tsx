

export default function Configuraciones() {
  
  const rows = [
  {
    concepto: 'Opción de acuerdo',
    color: 'bg-green-600 text-white',
    min: 3.5,
    max: 5,
  },
  {
    concepto: 'Opción indeciso',
    color: 'bg-yellow-300 text-black',
    min: 2.5,
    max: 3.49,
  },
  {
    concepto: 'Opción desfavorable',
    color: 'bg-red-600 text-white',
    min: 1,
    max: 2.49,
  },
];
  
  return (
    <>
      <main className="flex flex-col w-full gap-6">
        <section className="flex flex-col gap-3 py-3 border border-gray-400 rounded-sm justify-center items-center">
          <h2 className="text-gray-400 font-semibold text-2xl">Selecciona el periodo</h2>
          <details className="relative">
            <summary className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm">
              Rango de interpretacion de grupos o variables
            </summary>
            <ul className="absolute left-0 mt-1 w-48 bg-white border rounded shadow z-10">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Grupo o variable 1</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Grupo o variable 2</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Grupo o variable 3</li>
            </ul>
          </details>
        </section>

        <section className="p-6 border border-gray-400 rounded-sm bg-white shadow-md">
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
            Se mostrará el rango de interpretación que se tomarán en rangos de interpretación de grupos o variables
          </h2>

          <div className="overflow-x-auto border rounded">
            <table className="w-full table-auto text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Concepto</th>
                  <th className="px-4 py-2">Límite inferior</th>
                  <th className="px-4 py-2">Límite superior</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className={`px-4 py-2 font-medium ${row.color}`}>{row.concepto}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="any"
                        defaultValue={row.min}
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="any"
                        defaultValue={row.max}
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Guardar cambios
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

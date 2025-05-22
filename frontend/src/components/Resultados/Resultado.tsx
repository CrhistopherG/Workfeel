export default function Resultado() {
  return (
    <>
      <main className="flex flex-col w-full px-4 py-6">
        {/* Indicaciones y botones de exportación */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h2 className="text-gray-600 text-base md:text-lg max-w-2xl text-justify">
            Indicaciones: En este módulo podrás consultar los resultados de los periodos evaluados.
            Todos los resultados mostrados son promedios aritméticos. Selecciona el periodo y luego elige los criterios que desees filtrar, según tus necesidades.
          </h2>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              {["Word", "Excel", "PDF"].map((format) => (
                <button
                  key={format}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm"
                >
                  Exportar a {format}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de selección de periodos y visualización */}
        <section className="flex flex-col w-full mb-6 gap-4">
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="text-center text-gray-700 text-lg mb-2">Periodos</h2>
            <article className="flex justify-center">
              <details className="relative">
                <summary className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm">
                  Periodos disponibles
                </summary>
                <ul className="absolute left-0 mt-1 w-56 bg-white border rounded shadow z-10 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Periodo 1 Enero-Marzo</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Periodo 2 Abril-Junio</li>
                </ul>
              </details>
            </article>
          </div>

          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="text-center text-gray-700 text-lg mb-2">Elementos de visualización</h2>
            <article className="flex justify-center">
              <details className="relative">
                <summary className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm">
                  Todos
                </summary>
                <ul className="absolute left-0 mt-1 w-56 bg-white border rounded shadow z-10 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Departamentos</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dimensiones</li>
                </ul>
              </details>
            </article>
          </div>
        </section>

        {/* Filtros por dimensiones */}
        <section className="flex flex-col w-full border border-gray-300 rounded-md p-4">
          <h2 className="text-center text-gray-700 text-lg mb-6">Filtrar opciones por dimensiones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {[
              { titulo: "Filtrar género", opciones: ["Todos", "Hombres", "Mujeres"] },
              { titulo: "Filtrar edad", opciones: ["Todos", "18-24 años", "25-34 años"] },
              { titulo: "Filtrar departamento", opciones: ["Todos", "Aguascalientes", "Baja California"] },
              { titulo: "Filtrar puesto", opciones: ["Todos", "Desarrollador front-end", "Desarrollador back-end"] },
              { titulo: "Filtrar centro de trabajo", opciones: ["Todos", "Centro de desarrollo", "Centro de soporte"] },
              { titulo: "Filtrar rango de antigüedad", opciones: ["Todos", "1 a 5 años", "6 a 10 años"] }
            ].map(({ titulo, opciones }, i) => (
              <div key={i}>
                <h3 className="mb-1 text-gray-600 text-center">{titulo}</h3>
                <details className="relative">
                  <summary className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
                    Todos
                  </summary>
                  <ul className="absolute left-0 mt-1 w-56 bg-white border rounded shadow z-10">
                    {opciones.map((opcion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {opcion}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        </section>

              {/* Filtros por checkbox */}
        <section className="w-full border border-gray-300 p-4 mt-5 rounded-lg">
            <h2 className="text-center text-gray-500 mb-4">Filtrar por criterios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                Género
            </label>
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                Edad
            </label>
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                Departamento
            </label>
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                Puesto
            </label>
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                Centro de trabajo
            </label>
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                Antigüedad
            </label>
            </div>
        </section>
        <section className="flex justify-center mt-5">
            <button className="p-2 bg-blue-600 rounded-2xl text-white">Procesar reporte</button>
        </section>
      </main>
    </>
  );
}

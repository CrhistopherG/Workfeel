import { useState } from "react";
import {FaEdit, FaSearch, FaTrash } from "react-icons/fa";

export default function ListaPuestos() {
  const [setPuestos] = useState([
    { id: 1, puesto: "Jefe de Contabilidad Fiscal", departamento: "Contabilidad" },
    { id: 2, puesto: "Jefe de Soporte IT", departamento: "Soporte IT" },
    { id: 3, puesto: "Analista de Recursos Humanos", departamento: "RRHH" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [nuevoPuesto, setNuevoPuesto] = useState({ puesto: "", departamento: "" });

  const abrirModal = () => setIsOpen(true);
  const cerrarModal = () => {
    setIsOpen(false);
    setNuevoPuesto({ puesto: "", departamento: "" });
  };

  const agregarPuesto = async () => {
    // Obtener userId de localStorage
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      alert("Usuario no autenticado");
      return;
    }

    const user = JSON.parse(userStr)
    const userId = user.user_id

    try {
      const response = await fetch(`/api/users/${userId}/listapuestos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nuevoPuesto.puesto,
          department: nuevoPuesto.departamento,
        }),
      });

      if (!response.ok) throw new Error("Error al guardar puesto");

      const puestoCreado = await response.json();

      setPuestos((prev) => [
        ...prev,
        {
          id: puestoCreado.job_id || prev.length + 1,
          puesto: puestoCreado.name || nuevoPuesto.puesto,
          departamento: puestoCreado.department || nuevoPuesto.departamento,
        },
      ]);

      cerrarModal();
    } catch (error) {
      alert("No se pudo agregar el puesto. Intenta nuevamente.");
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex flex-col w-full gap-4">
        <section className="flex justify-around items-center">
          <h2 className="text-gray-500">
            Indicaciones: En este módulo podrás agregar los puestos de tu empresa
          </h2>
          <button onClick={abrirModal} className="p-2 bg-blue-600 rounded-2xl text-white">
            Nuevo puesto
          </button>
        </section>

        {/* ...resto del componente (tabla, filtros, etc.) */}

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-xl font-semibold mb-4">Agregar nuevo puesto</h3>
              <input
                type="text"
                placeholder="Nombre del puesto"
                value={nuevoPuesto.puesto}
                onChange={(e) => setNuevoPuesto({ ...nuevoPuesto, puesto: e.target.value })}
                className="w-full mb-3 border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Departamento"
                value={nuevoPuesto.departamento}
                onChange={(e) => setNuevoPuesto({ ...nuevoPuesto, departamento: e.target.value })}
                className="w-full mb-3 border rounded px-3 py-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={agregarPuesto}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

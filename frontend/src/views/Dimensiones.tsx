import { useEffect, useState } from "react";
import { getDimension } from "../services/DimensionService";
//importamos el breadcrumb
import { Breadcrumb } from "../components/Encuestas/Breadcrumb";
//importamos indicaciones
import { Indicaciones } from "../components/Encuestas/Indicaciones";
import { useNavigate } from "react-router-dom";
import { deleteDimension } from "../services/DimensionService";
type Dimension = {
  dimension_id: number;
  name: string;
  description: string;
  status?: boolean; // <-- ahora es opcional
  period_id?: number | null; // <-- agrega esto si también lo usas
};

const Dimensiones = () => {
  const [dimensiones, setDimensiones] = useState<Dimension[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDimension().then((data) => {
      if (Array.isArray(data)) setDimensiones(data);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

    const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta dimensión?")) {
      try {
        await deleteDimension(id);
        // Actualiza la lista quitando la dimensión eliminada
        setDimensiones(dimensiones.filter(dim => dim.dimension_id !== id));
      } catch (error) {
        alert("Error al eliminar la dimensión");
      }
    }
  };
  return (
    <div className="container mx-auto px-4">
      {/* ...tu código de breadcrumb e indicaciones... */}
      <Breadcrumb />
      {/* indicaciones */}
      <Indicaciones />
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/Encuestas/Dimensiones/agregar")}
      >
        Agregar Dimensión
      </button>

      {/* Tabla de Dimensiones */}
      <div className="bg-white border rounded-md shadow-md p-4">
        <div className="flex justify-between items-center bg-gray-600 text-black px-4 py-2 rounded-t-md">
          <span className="font-semibold">Dimensiones o Áreas</span>
        </div>
        <table className="w-full mt-4 text-left border-collapse">
          <thead className="bg-gray-600 text-black">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">Cargando...</td>
              </tr>
            ) : (
              dimensiones.map((dim, idx) => (
                <tr key={dim.dimension_id}>
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{dim.name}</td>
                  <td className="px-4 py-2">{dim.description}</td>
                  <td className="px-4 py-2">
                    {dim.status ? (
                      <span className="text-green-600 font-bold">Activo</span>
                    ) : (
                      <span className="text-red-600 font-bold">Cerrado</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/Encuestas/Dimensiones/${dim.dimension_id}/editar`)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:underline ml-2"
                      onClick={() => handleDelete(dim.dimension_id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dimensiones;
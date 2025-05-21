import { useEffect, useState } from "react";
import { getDimension, deleteDimension } from "../services/DimensionService";
import { Breadcrumb } from "../components/Encuestas/Breadcrumb";
import { Indicaciones } from "../components/Encuestas/Indicaciones";
import { useNavigate } from "react-router-dom";
import EditarDimensiones from "../components/Encuestas/EditarDimensiones";
type Dimension = {
  dimension_id: number;
  name: string;
  description: string;
  status: boolean;
  period_id?: number | null;
};
//exportaremos type dimension para poder usarlo en otros componentes
export type { Dimension };


const Dimensiones = () => {
  const [dimensiones, setDimensiones] = useState<Dimension[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDimensiones = async () => {
      setLoading(true);
      try {
        const data = await getDimension();

        if (Array.isArray(data)) {
          const cleanedData = data.map((dim) => ({
            ...dim,
            status:
              dim.status === true ||
              dim.status === "true" ||
              dim.status === 1 ||
              dim.status === "1",
          }));
          setDimensiones(cleanedData);
        } else {
          setDimensiones([]);
        }
      } catch {
        alert("Error al cargar dimensiones");
      } finally {
        setLoading(false);
      }
    };

    fetchDimensiones();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta dimensión?")) {
      try {
        await deleteDimension(id);
        setDimensiones((prev) => prev.filter((dim) => dim.dimension_id !== id));
      } catch {
        alert("Error al eliminar la dimensión");
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Breadcrumb />
      <Indicaciones />
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/Encuestas/Dimensiones/agregar")}
      >
        Agregar Dimensión
      </button>

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
                <td colSpan={5} className="text-center py-4">
                  Cargando...
                </td>
              </tr>
            ) : dimensiones.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No hay dimensiones para mostrar
                </td>
              </tr>
            ) : (
              dimensiones.map((dim, idx) => {
                const statusLabel = dim.status
                  ? <span className="text-green-600 font-semibold">Abierto</span>
                  : <span className="text-red-600 font-semibold">Cerrado</span>;

                return (
                  <tr key={dim.dimension_id}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{dim.name}</td>
                    <td className="px-4 py-2">{dim.description}</td>
                    <td className="px-4 py-2">{statusLabel}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() =>
                          navigate(`/Encuestas/Dimensiones/${dim.dimension_id}/editar`)
                        }
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dimensiones;
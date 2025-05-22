import { useEffect, useState } from "react";
import { getDimension, deleteDimension } from "../services/DimensionService";
import { Breadcrumb } from "../components/Encuestas/Breadcrumb";
import { Indicaciones } from "../components/Encuestas/Indicaciones";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPeriods } from "../services/PeriodService";

type Dimension = {
  dimension_id: number;
  name: string;
  description: string;
  status: boolean;
  period_id?: number | null;
};
export type { Dimension };

const Dimensiones = () => {
  const { user } = useAuth();
  const [dimensiones, setDimensiones] = useState<Dimension[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [periodId, setPeriodId] = useState<number | "">("");

  // Filtrar dimensiones por periodo seleccionado, o mostrar todas si no hay periodo seleccionado
  const dimensionesFiltradas = periodId
    ? dimensiones.filter(dim => dim.period_id === periodId)
    : dimensiones;

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
      } catch (error: any) {
        const msg = error?.response?.data?.data || "Error al eliminar la dimensión";
        alert(msg);
      }
    }
  };

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const data = await getPeriods();
        setPeriodos(data.data);
        if (data.data.length === 1) setPeriodId(data.data[0].period_id);
      } catch (error) {
        setPeriodos([]);
      }
    };
    fetchPeriodos();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Breadcrumb />
      <Indicaciones />
      {user?.rol_id === 1 && (
        <button
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/Encuestas/Dimensiones/agregar")}
        >
          Agregar Dimensión
        </button>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Filtro por Periodo</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={periodId}
          onChange={e => setPeriodId(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">Todos los periodos</option>
          {periodos.map(p => (
            <option key={p.period_id} value={p.period_id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border rounded-md shadow-md p-4">
        <div className="flex justify-between items-center bg-gray-600 text-black px-4 py-2 rounded-t-md">
          <span className="font-semibold">Dimensiones o Áreas</span>
        </div>
        <table className="w-full mt-4 text-left border-collapse">
          <thead className="bg-gray-600 text-black">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">ID de la Dimensión</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Status</th>
              {user?.rol_id === 1 && (
                <th className="px-4 py-2">Opciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Cargando...
                </td>
              </tr>
            ) : dimensionesFiltradas.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No hay dimensiones para mostrar
                </td>
              </tr>
            ) : (
              dimensionesFiltradas.map((dim, idx) => {
                const statusLabel = dim.status
                  ? <span className="text-green-600 font-semibold">Abierto</span>
                  : <span className="text-red-600 font-semibold">Cerrado</span>;

                return (
                  <tr key={dim.dimension_id}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{dim.name}</td>
                    <td className="px-4 py-2">{dim.dimension_id}</td>
                    <td className="px-4 py-2">{dim.description}</td>
                    <td className="px-4 py-2">{statusLabel}</td>
                    {user?.rol_id === 1 && (
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
                    )}
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
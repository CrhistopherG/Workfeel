import { useEffect, useState } from "react";
import { getScales } from "../services/ScaleService";
import { Scale } from "../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteScale } from "../services/ScaleService";
import { getActiveQuestions } from "../services/QuestionService";
import { BreadcrumbEsca } from "../components/Encuestas/BreadcrumbEsca";
import { IndicacionesEsca } from "../components/Encuestas/indicacionesEsca";

const Escalas = () => {
  const { user } = useAuth();
  const [scales, setScales] = useState<Scale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Para filtrar por pregunta
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionId, setQuestionId] = useState<number | "">("");

  useEffect(() => {
    const fetchScales = async () => {
      try {
        const data = await getScales();
        setScales(data);
      } catch (err) {
        setError("Error al cargar las escalas.");
      } finally {
        setLoading(false);
      }
    };
    fetchScales();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getActiveQuestions();
        setQuestions(data.data);
      } catch {
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, []);

  // Función para manejar la eliminación de una escala
  const handleDeleteScale = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta escala?")) {
      try {
        await deleteScale(id);
        setScales(scales.filter((scale) => scale.scale_id !== id));
      } catch (err: any) {
        // Mostrar advertencia si el backend devuelve un mensaje específico
        const msg = err?.response?.data?.data || "Error al eliminar la escala.";
        alert(msg); // Puedes usar un toast/modal aquí si prefieres
      }
    }
  };

  // Filtrar escalas por pregunta seleccionada y solo mostrar escalas de preguntas existentes
  const preguntasIds = questions.map(q => q.question_id);
  const scalesFiltradas = questionId
    ? scales.filter(s => s.question_id === questionId)
    : scales.filter(s => preguntasIds.includes(s.question_id));

  return (
    <div className="container mx-auto px-4 py-6">
      <BreadcrumbEsca />
      <IndicacionesEsca />
      <h1 className="text-2xl font-bold mb-6">Todas las Escalas/Opciones</h1>
      {user?.rol_id === 1 && (
        <button
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/encuestas/escalas/agregar")}
        >
          Agregar Escala
        </button>
      )}

      {/* Selector de pregunta */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Filtrar por Pregunta</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={questionId}
          onChange={e => setQuestionId(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">Todas las preguntas</option>
          {questions.map(q => (
            <option key={q.question_id} value={q.question_id}>{q.content}</option>
          ))}
        </select>
      </div>

      {loading && <div>Cargando escalas...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pregunta ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                {user?.rol_id === 1 && (
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Opciones</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scalesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    No hay escalas registradas.
                  </td>
                </tr>
              ) : (
                scalesFiltradas.map((scale) => (
                  <tr key={scale.scale_id}>
                    <td className="px-4 py-2">{scale.scale_id}</td>
                    <td className="px-4 py-2">{scale.question_id}</td>
                    <td className="px-4 py-2">{scale.value ?? "-"}</td>
                    <td className="px-4 py-2">{scale.description}</td>
                    {user?.rol_id === 1 && (
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => navigate(`/encuestas/escalas/editar/${scale.scale_id}`)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          onClick={() => handleDeleteScale(scale.scale_id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Escalas;
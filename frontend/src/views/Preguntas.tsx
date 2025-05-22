import React, { useEffect, useState } from "react";
import { getActiveQuestions } from "../services/QuestionService";
import { Question } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteQuestion } from "../services/QuestionService";
import { useAuth } from "../context/AuthContext";
import { getDimension } from "../services/DimensionService";
import { IndicacionesPregu } from "../components/Encuestas/indicacionespregu";
import { Breadcrumbpregun } from "../components/Encuestas/Breadcrumbpregun";

const Preguntas = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [dimensiones, setDimensiones] = useState<any[]>([]);
  const [dimensionId, setDimensionId] = useState<number | "">("");

  useEffect(() => {
    const fetchDimensiones = async () => {
      try {
        const data = await getDimension();
        if (Array.isArray(data)) {
          setDimensiones(data);
        } else {
          setDimensiones([]);
        }
      } catch {
        setDimensiones([]);
      }
    };
    fetchDimensiones();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveQuestions();
        setQuestions(data.data); // Solo preguntas de dimensiones activas
      } catch (error) {
        console.error("Error al cargar preguntas activas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAgregarPregunta = () => {
    navigate("/encuestas/preguntas/agregar");
  };

  const handleEliminarPregunta = async (id: number) => {
    try {
      setLoading(true);
      await deleteQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.question_id !== id));
    } catch (error: any) {
      // Mostrar advertencia si el backend devuelve el mensaje de escalas asociadas
      const msg = error?.response?.data?.data || "Error al eliminar la pregunta";
      alert(msg); // Puedes usar un toast/modal aquí si prefieres
    } finally {
      setLoading(false);
    }
  };

  // Filtrar preguntas por dimensión seleccionada
  const preguntasFiltradas = dimensionId
    ? questions.filter(q => q.dimension_id === dimensionId)
    : questions;

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumbpregun />
      <IndicacionesPregu />
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-gray-800">Preguntas (solo dimensiones activas)</h1>
        {user?.rol_id === 1 && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAgregarPregunta}
          >
            Agregar Pregunta
          </button>
        )}
      </div>

      {/* Selector de dimensión */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Filtrar por Dimensión</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={dimensionId}
          onChange={e => setDimensionId(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">Todas las dimensiones</option>
          {dimensiones.map(d => (
            <option key={d.dimension_id} value={d.dimension_id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensión ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pregunta ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pregunta</th>
              {user?.rol_id === 1 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Cargando preguntas...
                </td>
              </tr>
            ) : preguntasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No hay preguntas de dimensiones activas.
                </td>
              </tr>
            ) : (
              preguntasFiltradas.map((q, index) => (
                <tr key={q.question_id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{q.dimension_id}</td>
                  <td className="px-6 py-4">{q.question_id}</td>
                  <td className="px-6 py-4">{q.content}</td>
                  {user?.rol_id === 1 && (
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-2"
                        onClick={() => navigate(`/encuestas/preguntas/editar/${q.question_id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          if (window.confirm("¿Estás seguro de eliminar esta pregunta?")) {
                            handleEliminarPregunta(q.question_id);
                          }
                        }}
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
    </div>
  );
};

export default Preguntas;
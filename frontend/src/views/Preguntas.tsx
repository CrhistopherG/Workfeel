import React, { useEffect, useState } from "react";
import { getActiveQuestions } from "../services/QuestionService";
import { Question } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteQuestion } from "../services/QuestionService";

const Preguntas = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    } catch (error) {
      alert("Error al eliminar la pregunta");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Preguntas (solo dimensiones activas)</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAgregarPregunta}
        >
          Agregar Pregunta
        </button>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Preguntas (solo dimensiones activas)</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensión ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pregunta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center">
                  Cargando preguntas...
                </td>
              </tr>
            ) : questions.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No hay preguntas de dimensiones activas.
                </td>
              </tr>
            ) : (
              questions.map((q, index) => (
                <tr key={q.question_id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{q.dimension_id}</td>
                  <td className="px-6 py-4">{q.content}</td>
                  {/* agregamos opciones de eliminar y actualizar */}
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
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, updateQuestion, getActiveDimensions } from "../../services/QuestionService";
import { DraftQuestion } from "../../types";

type ActiveDimension = {
  dimension_id: number;
  name: string;
};

const EditarPreguntas = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<DraftQuestion>({ content: "", dimension_id: 0 });
  const [dimensions, setDimensions] = useState<ActiveDimension[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar dimensiones activas
    getActiveDimensions()
      .then((dims: ActiveDimension[]) => setDimensions(dims))
      .catch(() => setDimensions([]));

    // Cargar datos de la pregunta
    getQuestions()
      .then((res) => {
        const pregunta = res.data.find((q: any) => q.question_id === Number(id));
        if (pregunta) {
          setForm({
            content: pregunta.content,
            dimension_id: pregunta.dimension_id,
          });
        } else {
          setError("Pregunta no encontrada");
        }
      })
      .catch(() => setError("Error al cargar la pregunta"));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await updateQuestion(Number(id), {
        content: form.content,
        dimension_id: Number(form.dimension_id),
      });
      setSuccess("Pregunta actualizada correctamente");
      setTimeout(() => {
        navigate("/encuestas/preguntas");
      }, 1200);
    } catch (err: any) {
      setError("Error al actualizar la pregunta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Pregunta</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Pregunta</label>
        <input
          type="text"
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Dimensión</label>
        <select
          name="dimension_id"
          value={form.dimension_id}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Selecciona una dimensión</option>
          {dimensions.map((dim) => (
            <option key={dim.dimension_id} value={dim.dimension_id}>
              {dim.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Actualizando..." : "Actualizar Pregunta"}
      </button>
    </form>
  );
};

export default EditarPreguntas;
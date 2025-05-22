import React, { useEffect, useState } from "react";
import { createQuestion, } from "../../services/QuestionService";
import { DraftQuestion } from "../../types";
import { getActiveDimensions } from "../../services/QuestionService";
import { useNavigate } from "react-router-dom";
type ActiveDimension = {
    dimension_id: number;
    name: string;
};

const AgregarPreguntas = () => {
    const [form, setForm] = useState<DraftQuestion>({ content: "", dimension_id: 0 });
    const [dimensions, setDimensions] = useState<ActiveDimension[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getActiveDimensions()
            .then((dims: ActiveDimension[]) => setDimensions(dims))
            .catch(() => setDimensions([]));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        // Validación antes de enviar
        if (!form.dimension_id || isNaN(Number(form.dimension_id))) {
            setError("Selecciona una dimensión activa.");
            setLoading(false);
            return;
        }

        try {
            await createQuestion({
                content: form.content,
                dimension_id: Number(form.dimension_id), // <-- asegúrate de enviar un número
            });
            setSuccess("Pregunta agregada correctamente");
            setTimeout(() => {
                navigate("/encuestas/preguntas"); // <-- Redirige al panel de preguntas
            }, 1200);
            setForm({ content: "", dimension_id: 0 });
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Error al agregar la pregunta"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Agregar Pregunta</h2>
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
                {loading ? "Agregando..." : "Agregar Pregunta"}
            </button>
        </form>
    );
};

export default AgregarPreguntas;
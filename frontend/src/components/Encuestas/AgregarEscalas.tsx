import React, { useState, useEffect } from "react";
import { createScale } from "../../services/ScaleService";
import { getQuestions1 } from "../../services/QuestionService";
import { useNavigate } from "react-router-dom";

const AgregarEscalas = () => {
    const [questionId, setQuestionId] = useState<number | "">("");
    const [escalas, setEscalas] = useState([{ value: "", description: "" }]);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [preguntas, setPreguntas] = useState<{ question_id: number, content: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar preguntas al montar el componente
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions1();
                setPreguntas(data);
            } catch {
                setPreguntas([]);
            }
        };
        fetchQuestions();
    }, []);

    const handleChange = (idx: number, field: string, value: string) => {
        const nuevas = escalas.map((e, i) =>
            i === idx ? { ...e, [field]: value } : e
        );
        setEscalas(nuevas);
    };

    const handleAdd = () => {
        setEscalas([...escalas, { value: "", description: "" }]);
    };

    const handleRemove = (idx: number) => {
        setEscalas(escalas.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMensaje(null);
        try {
            const payload = escalas.map((e) => ({
                question_id: Number(questionId),
                value: e.value === "" ? null : Number(e.value),
                description: e.description,
            }));
            await createScale(payload);
            setMensaje("Escalas agregadas correctamente.");
            setTimeout(() => navigate("/encuestas/escalas"), 1200);
        } catch (err) {
            setMensaje("Error al agregar escalas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Agregar Escalas/Opciones</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Selecciona la Pregunta</label>
                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={questionId}
                        onChange={(e) => setQuestionId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecciona una pregunta...</option>
                        {preguntas.map((p) => (
                            <option key={p.question_id} value={p.question_id}>
                                {p.content}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Escalas/Opciones</label>
                    {escalas.map((escala, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="number"
                                className="border rounded px-2 py-1 w-20"
                                placeholder="Valor"
                                value={escala.value}
                                onChange={(e) => handleChange(idx, "value", e.target.value)}
                                min={1}

                            />
                            <input
                                type="text"
                                className="border rounded px-2 py-1 flex-1"
                                placeholder="Descripción"
                                value={escala.description}
                                onChange={(e) => handleChange(idx, "description", e.target.value)}
                                required
                            />
                            {escalas.length > 1 && (
                                <button
                                    type="button"
                                    className="text-red-600 font-bold"
                                    onClick={() => handleRemove(idx)}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-green-600 text-white px-3 py-1 rounded mt-2"
                        onClick={handleAdd}
                    >
                        + Agregar otra
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Guardar Escalas"}
                </button>
                {mensaje && (
                    <div className="mt-2 text-center text-sm text-green-700">{mensaje}</div>
                )}
            </form>
        </div>
    );
};

export default AgregarEscalas;
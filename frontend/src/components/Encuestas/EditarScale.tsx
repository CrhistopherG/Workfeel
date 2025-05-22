import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScaleById, updateScale } from "../../services/ScaleService";

const EditarScale = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [scale, setScale] = useState<{ value: string; description: string }>({
        value: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);
    useEffect(() => {
        const fetchScale = async () => {
            try {
                if (id) {
                    const data = await getScaleById(Number(id));
                    setScale({
                        value: data.value ?? "",
                        description: data.description ?? "",
                    });
                }
            } catch {
                setMensaje("Error al cargar la escala.");
            }
        };
        fetchScale();
    }, [id]);

    const handleChange = (field: string, value: string) => {
        setScale((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMensaje(null);
        try {
            if (!id || isNaN(Number(id))) {
                setMensaje("ID de escala inválido.");
                setLoading(false);
                return;
            }
            await updateScale(Number(id), {
                value: scale.value === "" ? null : Number(scale.value),
                description: scale.description,
            });
            setMensaje("Escala actualizada correctamente.");
            setTimeout(() => navigate("/encuestas/escalas"), 1200);
        } catch {
            setMensaje("Error al actualizar la escala.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Editar Escala/Opción</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Valor</label>
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-20"
                        placeholder="Valor"
                        value={scale.value}
                        onChange={(e) => handleChange("value", e.target.value)}
                        min={1}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Descripción</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Descripción"
                        value={scale.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Actualizar Escala"}
                </button>
                {mensaje && (
                    <div className="mt-2 text-center text-sm text-green-700">{mensaje}</div>
                )}
            </form>
        </div>
    );
};

export default EditarScale;
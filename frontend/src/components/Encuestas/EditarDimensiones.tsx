import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDimension, getDimensionById } from "../../services/DimensionService";

const EditarDimensiones = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: true,
        period_id: 1
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchDimension = async () => {
            setLoading(true);
            try {
                if (!id) throw new Error("ID no proporcionado");

                const response = await getDimensionById(Number(id));
                const dimension = response.data || response;

                setFormData({
                    name: dimension.name,
                    description: dimension.description,
                    status: Boolean(
                        dimension.status === true ||
                        dimension.status === "true" ||
                        dimension.status === 1 ||
                        dimension.status === "1"
                    ),
                    period_id: dimension.period_id || 1
                });
            } catch (err) {
                console.error("Error al cargar:", err);
                setError("Error al cargar la dimensión");
            } finally {
                setLoading(false);
            }
        };
        fetchDimension();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            if (!id) throw new Error("ID no proporcionado");

            // Desestructurar del estado o pasar formData completo
            const response = await updateDimension(Number(id), formData);

            console.log("Respuesta completa:", response);

            if (response && response.data) {
                setSuccess(true);
                setTimeout(() => navigate("/Encuestas/Dimensiones"), 1200);
            } else {
                throw new Error("Respuesta inesperada del servidor");
            }
        } catch (err) {
            console.error("Error en handleSubmit:", err);
            setError(err instanceof Error ? err.message : "Error al actualizar la dimensión");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">Editar Dimensión</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="border border-gray-300 p-2 rounded w-full focus:outline-blue-400"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="description"
                        className="border border-gray-300 p-2 rounded w-full focus:outline-blue-400"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                        id="status"
                        className="accent-blue-600"
                    />
                    <label htmlFor="status" className="text-gray-700">
                        {formData.status ? "Activo" : "Inactivo"}
                    </label>
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Periodo</label>
                    <input
                        type="number"
                        className="border border-gray-300 p-2 rounded w-full bg-gray-100 text-gray-500"
                        value={formData.period_id}
                        disabled
                        readOnly
                    />
                </div>
                {error && <div className="text-red-600 font-semibold">{error}</div>}
                {success && <div className="text-green-600 font-semibold">¡Dimensión actualizada correctamente!</div>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold transition"
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
        </div>
    );
};

export default EditarDimensiones;
import { Link, useLoaderData } from 'react-router-dom'
import { getDimension } from '../../services/Dimension'
import ListDimension from '../../components/Encuestas/ListDimension'
import type { Dimension } from '../../types'

//cargamos los valores de nuestro dato 
export async function loader() {
    const dimensiones = await getDimension();
    return dimensiones;
}

export default function Dimension() {
    const dimensiones = useLoaderData() as Dimension[];
    return (
        <div>
            <div className="bg-white border border-gray-300 rounded-md w-full shadow-sm">
                <table className="bg-white border-collapse w-full">
                    {/* Encabezado de la tabla */}
                    <thead className="bg-slate-800 text-white text-center">
                        <tr>
                            <th className="p-2 text-center">Orden</th>
                            <th className="p-2 text-center">Nombre</th>
                            <th className="p-2 text-center">Opciones</th>
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="text-center">
                        {dimensiones.map((dimensiones) => (
                            <tr key={dimensiones.dimension_id} className="border-b border-gray-200">
                                <td className="p-2">{dimensiones.dimension_id}</td>
                                <td className="p-2">{dimensiones.name}</td>
                                <td className="p-2">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded m-2 hover:bg-red-600">
                                        Eliminar
                                    </button>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import { Link, useLoaderData } from 'react-router-dom'
import { getScale } from '../services/escalas'
import Listscale from '../components/Encuestas/Listscale'
import type { Scale } from '../types'
import { MdHelpOutline } from "react-icons/md";


export async function loader() {
    const scalies = await getScale();
    return scalies;
}

export default function Escalas() {
    const scale = useLoaderData() as Scale[];
    return (
        <div>
            <div className="container mx-auto px-4">
                {/* Navegación */}
                <div className="py-1">
                    <nav aria-label="breadcrumb">
                        <ol className="flex space-x-2 text-gray-500">
                            <li>
                                <Link to="/escala" className="flex items-center hover:text-blue-600">
                                    <MdHelpOutline className="mr-1 text-blue-500" />
                                    Encuestas
                                </Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-gray-800 font-medium">Escala</li>
                        </ol>
                    </nav>
                </div>

                {/* Instrucciones */}
                <div className="text-center mb-6">
                    <p className="text-gray-600">
                        Indicaciones: En este módulo podrás agregar, editar y eliminar preguntas de tu encuesta. Además, tendrás la flexibilidad de personalizarla según tus necesidades.
                    </p>
                </div>

                {/* Tabla */}
                <div className="bg-white border border-gray-300 rounded-md shadow-sm w-full">
                    <table className="bg-white border-collapse w-full">
                        {/* Encabezado de la tabla */}
                        <thead className="bg-slate-800 text-white text-center">
                            <tr>
                                <th className="p-2 text-center">ID</th>
                                <th className="p-2 text-center">Descripción</th>
                                <th className="p-2 text-center">Valor</th>
                            </tr>
                        </thead>

                        {/* Cuerpo de la tabla */}
                        <tbody className="text-center">
                            {scale.map((scale) => (
                                <tr key={scale.scale_id} className="border-b border-gray-200">
                                    <td className="p-2">{scale.scale_id}</td>
                                    <td className="p-2">{scale.description}</td>
                                    <td className="p-2">{scale.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* mi segundo div */}
            <div className="bg-white border-2 border-solid w-full mt-6 rounded-md shadow-md">
                <h2 className="bg-slate-800 text-white text-center py-2 rounded-t-md">Comunicación Eficaz</h2>
                <div className="p-4">
                    <p className="text-gray-600">
                        1 - Estoy informado(a) de las razones por las cuales se hacen cambios en las políticas y procedimientos de la organización.
                    </p>
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        <div className="text-center">
                            <label htmlFor="totalmente-desacuerdo" className="block text-gray-800">
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="totalmente-desacuerdo"
                                    value="1"
                                    className="mr-2"
                                />
                                Totalmente en desacuerdo
                            </label>
                        </div>
                        <div className="text-center">
                            <label htmlFor="desacuerdo" className="block text-gray-800">
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="desacuerdo"
                                    value="2"
                                    className="mr-2"
                                />
                                En desacuerdo
                            </label>
                        </div>
                        <div className="text-center">
                            <label htmlFor="neutral" className="block text-gray-800">
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="neutral"
                                    value="3"
                                    className="mr-2"
                                />
                                En Ocasiones
                            </label>
                        </div>
                        <div className="text-center">
                            <label htmlFor="de-acuerdo" className="block text-gray-800">
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="de-acuerdo"
                                    value="4"
                                    className="mr-2"
                                />
                                De acuerdo
                            </label>
                        </div>
                        <div className="text-center">
                            <label htmlFor="totalmente-de-acuerdo" className="block text-gray-800">
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="totalmente-de-acuerdo"
                                    value="5"
                                    className="mr-2"
                                />
                                Totalmente de acuerdo
                            </label>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Obtener el valor
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
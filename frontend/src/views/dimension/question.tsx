import { Link, useLoaderData } from "react-router-dom"
import { getquestion } from "../../services/preguntas"
import { ListQuestion } from "../../components/Encuestas/ListQuestion";
import type { Question } from "../../types"

export async function loader() {
  const question = await getquestion();
  if (!question) {
    return []; // Devuelve un array vacío si no hay datos
  }
  return question;
}

export default function Question() {
  const questiones = useLoaderData() as Question[];

  if (!Array.isArray(questiones)) {
    return <p>No hay preguntas disponibles.</p>;
  }

  return (
    <div>
      <div className="bg-white border border-gray-300 rounded-md w-full shadow-sm">
        <table className="bg-white border-collapse w-full">
          {/* encabezado de la tabla */}
          <thead className="bg-slate-800 text-white text-center">
            <tr>
              <th className="p-2 text-center">#</th>
              <th className="p-2 text-center">Dimensiones</th>
              <th className="p-2 text-center">Preguntas</th>
              <th className="p-2 text-center">Opciones</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {questiones.map((question) => (
              <tr key={question.question_id} className="border-b border-gray-200">
                <td className="p-2">{question.question_id}</td>
                <td className="p-2">{question.dimension_id}</td>
                <td className="p-2">{question.content}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded m-2 hover:bg-blue-600">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { Period } from "../types";

type PeriodDetailsProps = {
    period: Period
}

export default function PeriodDetails({period} : PeriodDetailsProps) {
    return (
        <tr className="border-2 text-center">
        <td className="p-3 text-lg text-gray-800">
            {period.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {period.status ? 'Activo' : 'Inactivo'}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {period.date_start.toString()}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {period.date_end.toString()}
        </td>
        <td className="p-3 text-lg text-gray-800">
            Opciones
        </td>
    </tr>
    )
}
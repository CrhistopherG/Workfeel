import { Scale } from "../../types"

type ScaleDetailsProps = {
    scale: Scale; // Define el tipo de la prop
}

const Listscale = ({ scale }: ScaleDetailsProps) => {
    return (
        <div>
            <tr>
                <td className="p-3 text-lg text-gray-800">
                    {scale.description}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {scale.value}
                </td>
            </tr>
        </div>
    )
}

export default Listscale


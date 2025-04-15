
import { Dimension } from '../../types'

//define el tipo de la prop
type DimensionDetailsProps = {
    dimension: Dimension; // Define el tipo de la prop
}

const ListDimension = ({ dimension }: DimensionDetailsProps) => {
    return (
        <div>
            <tr>
                <td className='p-3 text-lg text-gray-800'>
                    {dimension.dimension_id}
                </td>
                <td className='p-3 text-lg text-gray-800'>
                    {dimension.name}
                </td>
                <td className='p-3 text-lg text-gray-800'>
                    {dimension.description}
                </td>
                <td className='p-3 text-lg text-gray-800'>
                    {dimension.status ? 'Activo' : 'Inactivo'}
                </td>
            </tr>
        </div>
    )
}

export default ListDimension

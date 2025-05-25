import { Link } from 'react-router-dom'
import { MdLinearScale } from "react-icons/md";

export const BreadcrumbEsca = () => {
    return (
        <div className="py-4">
            <nav aria-label="breadcrumb">
                <ol className="flex space-x-2 text-gray-500">
                    <li>
                        <Link to="/dimensiones" className="flex items-center hover:text-gray-700">
                            <MdLinearScale className="mr-1" />
                            Encuestas
                        </Link>
                    </li>
                    <li className="text-gray-400">/</li>
                    <li className="text-gray-700">Escala</li>
                </ol>
            </nav>
        </div>
    )
}

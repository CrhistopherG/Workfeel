import React from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
export const Breadcrumb = () => {
    return (
        <div className="py-4">
            <nav aria-label="breadcrumb">
                <ol className="flex space-x-2 text-gray-500">
                    <li>
                        <Link to="/dimensiones" className="flex items-center hover:text-gray-700">
                            <CiUser className="mr-1" />
                            Encuestas
                        </Link>
                    </li>
                    <li className="text-gray-400">/</li>
                    <li className="text-gray-700">Dimensiones</li>
                </ol>
            </nav>
        </div>
    )
}

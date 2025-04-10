import { useLoaderData } from 'react-router-dom';
import User from '../../views/User';
import CompanyList from '../../views/CompanyList';

export default function Panel_Administrador() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administrador</h1>

            {/* Tabla de Usuarios */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestión de Usuarios</h2>

                <User />
            </div>

            {/* Tabla de Empresas */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestión de Empresas</h2>
                <CompanyList />
            </div>
        </div>
    );
}
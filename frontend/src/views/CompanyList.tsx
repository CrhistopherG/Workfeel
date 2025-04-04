import { Link, useLoaderData } from 'react-router-dom';
import { getCompany } from '../services/CompanyService';
import CompanyDetails from "../components/CompanyDetails"; // Asegúrate de que la ruta sea correcta
import type { Company } from "../types";

export async function loader() {
    const companies = await getCompany();
    return companies;
}

export default function CompanyList() {
    const companys = useLoaderData() as Company[];
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Empresas</h2>
                <Link
                    to="/empresa/nueva"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar Empresa
                </Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Dirección</th>
                            <th className="p-2">Correo</th>
                            <th className="p-2">Créditos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companys.map((company) => (
                            <CompanyDetails
                                key={company.company_id}
                                company={company} // Cambiado a "company"
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
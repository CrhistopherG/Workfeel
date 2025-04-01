import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import CompanyList from './views/CompanyList'
import { loader as companyLoader } from './views/CompanyList';
import NewCompany, { action as newCompanyAction } from './views/NewCompany'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <User />,
                loader: usersLoader
            },
            {
                path: '/usuario/nuevo',
                element: <NewUser />,
                action: newUserAction
            },

            {
                path: '/empresa',
                element: <CompanyList />,
                loader: companyLoader, // Loader para obtener la lista de empresas
            },
            {
                path: '/empresa/nueva',
                element: <NewCompany />,
                action: newCompanyAction, // Acción para agregar una nueva empresa
                 // Componente para agregar una nueva empresa
            },
        ]
    }
])
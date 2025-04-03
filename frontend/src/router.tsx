import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import CompanyList from './views/CompanyList'
import { loader as companyLoader } from './views/CompanyList';
import NewCompany, { action as newCompanyAction } from './views/NewCompany'
import Login from './views/Login'
import Dimensiones from './components/Encuestas/Dimensiones'
import Preguntas from './components/Encuestas/Preguntas'
import Escalas from './components/Encuestas/Escalas'
import Periodo from './components/Periodo/Periodo'

export const router = createBrowserRouter([
    {
        index: true,
        path: '/',
        element: <Login />
    },
    {
        path: '/encuestas',
        element: <Layout />,
        children: [
            {
                path: '/encuestas/dimensiones',
                element: <Dimensiones />
            },
            {
                path: '/encuestas/preguntas',
                element: <Preguntas />
            },
            {
                path: '/encuestas/escalas',
                element: <Escalas />
            }
        ]
    },
    {
        path: '/usuarios',
        element: <Layout />,
        children: [
            {
                path: '/usuarios/ver_todos',
                element: <User />,
                loader: usersLoader
            },
            {
                path: '/usuarios/nuevo',
                element: <NewUser />,
                action: newUserAction
            }
        ]
    },
    {
        path: '/empresa',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CompanyList />,
                loader: companyLoader // Loader para obtener la lista de empresas
            },
            {
                path: '/empresa/nueva',
                element: <NewCompany />,
                action: newCompanyAction // Acción para agregar una nueva empresa
            }
        ]
    },
    {
        path: '/periodo',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Periodo />
            }
        ]
    },
    {
        path: '/Panel_Administrativo',
        element: <Layout />, // Layout exclusivo para el panel administrativo
        children: [
            {
                index: true,
                element: <CompanyList />, // Página principal del panel administrativo
                loader: companyLoader,
            },
            {
                path: 'empresa/nueva',
                element: <NewCompany />,
                action: newCompanyAction,
            },
            {
                path: 'usuarios',
                element: <User />,
                loader: usersLoader,
            },
            {
                path: 'usuarios/nuevo',
                element: <NewUser />,
                action: newUserAction,
            },
        ],
    },
])
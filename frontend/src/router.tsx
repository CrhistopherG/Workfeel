import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import Login from './views/Login'
import Dimensiones, { loader as DimensionLoader } from './components/Encuestas/Dimensiones'
import Preguntas from './components/Encuestas/Preguntas'
import Escalas from './components/Encuestas/Escalas'
import Periodo, { loader as PeriodoLoader } from './components/Periodo/Periodo'
import ProtectedRoute from './auth/ProtectedRoute'
import ModuloPanelAdmin from './components/navbar-sidebar/Modulos/ModuloPanelAdmin'


import CompanyList, { loader as companyLoader } from './views/CompanyList'
import NewCompany, { action as newCompanyAction } from './views/NewCompany'

//importamos el action de agregar dimension
import AgregarDimensiones from './components/Encuestas/AgregarDimensiones'
//importamos el action de agregar dimension
export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                        path: '/api/periodo',
                        element: <Periodo />,
                        loader: PeriodoLoader
                    },
                    {
                        path: '/encuestas/dimensiones',
                        element: <Dimensiones />,
                        loader: DimensionLoader
                    },
                    {
                        path: '/encuestas/preguntas',
                        element: <Preguntas />
                    },
                    {
                        path: '/encuestas/escalas',
                        element: <Escalas />
                    },
                    {
                        path: '/panel_administrativo',
                        element: <ModuloPanelAdmin />
                    },
                    {
                        path: '/panel_administrativo/usuarios/ver_todos',
                        element: <User />,
                        loader: usersLoader
                    },
                    {
                        path: '/panel_administrativo/usuarios/nuevo',
                        element: <NewUser />,
                        action: newUserAction
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
])
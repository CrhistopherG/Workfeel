import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import Login from './views/Login'
import Preguntas from './views/Preguntas'
import Escalas from './views/Escalas'
import Periodo, { loader as PeriodoLoader } from './components/Periodo/Periodo'
import ProtectedRoute from './auth/ProtectedRoute'
import ModuloPanelAdmin from './components/navbar-sidebar/Modulos/ModuloPanelAdmin'
import Dimensiones from './views/Dimensiones'
import CompanyList, { loader as companyLoader } from './views/CompanyList'
import NewCompany, { action as newCompanyAction } from './views/NewCompany'
//importamos el action de agregar dimension
import AgregarDimensiones from './components/Encuestas/AgregarDimensiones'
import EditarDimensiones from './components/Encuestas/EditarDimensiones';
import AgregarPreguntas from './components/Encuestas/AgregarPreguntas'
import EditarPreguntas from './components/Encuestas/EditarPreguntas'
import AgregarEscalas from './components/Encuestas/AgregarEscalas'
import EditarScale from './components/Encuestas/EditarScale'
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
                    }, {
                        path: '/encuestas/dimensiones/agregar',
                        element: <AgregarDimensiones />
                    }, {
                        path: '/encuestas/dimensiones/:id/editar',
                        element: <EditarDimensiones />
                    },
                    {
                        path: '/encuestas/preguntas',
                        element: <Preguntas />
                    }, {
                        path: '/encuestas/preguntas/agregar',
                        element: <AgregarPreguntas />
                    },
                    {
                        path: '/encuestas/preguntas/editar/:id',
                        element: <EditarPreguntas />
                    },
                    {
                        path: '/encuestas/escalas',
                        element: <Escalas />
                    },
                    {
                        path: '/encuestas/escalas/agregar',
                        element: <AgregarEscalas />
                    },
                    {
                        path: '/encuestas/escalas/editar/:id',
                        element: <EditarScale />
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
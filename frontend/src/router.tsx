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
import AgregarDimensiones from './components/Encuestas/AgregarDimensiones'
import EditarDimensiones from './components/Encuestas/EditarDimensiones'
import AgregarPreguntas from './components/Encuestas/AgregarPreguntas'
import EditarPreguntas from './components/Encuestas/EditarPreguntas'
import AgregarEscalas from './components/Encuestas/AgregarEscalas'
import EditarScale from './components/Encuestas/EditarScale'
import Register, {action as RegisterAction} from './views/Register'
import Configuraciones from './components/Generales/Configuraciones'
import ListaPuestos from './components/Generales/ListaPuestos'
import Resultado from './components/Resultados/Resultado'
import PlanAccion from './components/Generales/PlanAccion'
import NivelesSatisfaccion from './components/Resultados/NivelesSatisfaccion'
import CompararPeriodos from './components/Resultados/CompararPeriodos'

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />,
        action: RegisterAction
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
                        element: <Dimensiones />
                    },
                    {
                        path: '/encuestas/dimensiones/agregar',
                        element: <AgregarDimensiones />
                    },
                    {
                        path: '/encuestas/dimensiones/:id/editar',
                        element: <EditarDimensiones />
                    },
                    {
                        path: '/encuestas/preguntas',
                        element: <Preguntas />
                    },
                    {
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
                    },
                    {
                        path: '/empresas/lista',
                        element: <CompanyList />,
                        loader: companyLoader
                    },
                    {
                        path: '/empresas/nueva',
                        element: <NewCompany />,
                        action: newCompanyAction
                    },
                    {
                        path: '/generales/configuraciones',
                        element: <Configuraciones />
                    },
                    {
                        path: '/generales/lista_puestos',
                        element: <ListaPuestos />
                    },
                    {
                        path: '/generales/plan_accion',
                        element: <PlanAccion />
                    },
                    {
                        path: '/resultados/resultado',
                        element: <Resultado />
                    },
                    {
                        path: '/resultados/niveles_satisfaccion',
                        element: <NivelesSatisfaccion />
                    },
                    {
                        path: '/resultados/comparar_periodos',
                        element: <CompararPeriodos />
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
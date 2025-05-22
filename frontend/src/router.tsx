import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import Login from './views/Login'
import Dimensiones, {loader as DimensionLoader} from './components/Encuestas/Dimensiones'
import Preguntas from './components/Encuestas/Preguntas'
import Escalas from './components/Encuestas/Escalas'
import Periodo, { loader as PeriodoLoader } from './components/Periodo/Periodo'
import ProtectedRoute from './auth/ProtectedRoute'
import ModuloPanelAdmin from './components/navbar-sidebar/Modulos/ModuloPanelAdmin'
import ListaPuestos from './components/Generales/ListaPuestos'
import PlanAccion from './components/Generales/PlanAccion'
import Configuraciones from './components/Generales/Configuraciones'
import Resultado from './components/Resultados/Resultado'
import NivelesSatisfaccion from './components/Resultados/NivelesSatisfaccion'
import CompararPeriodos from './components/Resultados/CompararPeriodos'
import Register, {action as RegisterAction} from './views/Register'


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
            path: '/generales/configuraciones',
            element: <Configuraciones />
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
          },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])
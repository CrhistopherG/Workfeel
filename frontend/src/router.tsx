import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader, loader as usersLoader } from './views/User'
import escales, { loader as escalesLoader } from './views/escales'
import NewUser, { action as newUserAction } from './views/NewUser'
import Login from './views/Login'
import Escalasorigin from './components/Encuestas/Escalasorigin'
import Dimensiones from './components/Encuestas/Dimensiones'
import { Resultado } from './components/Resultados/Resultado'
import Preguntas from './components/Encuestas/Preguntas'
import Periodo from './components/Periodo/Periodo'
import ProtectedRoute from './auth/ProtectedRoute'
import CompanyList, { loader as companylist } from './views/CompanyList'
import NewCompany, { action as newcompany } from './views/NewCompany'
import Dimension, { loader as Dimensionloader } from './views/dimension/dimension'
import Question, { loader as Questionloader } from './views/dimension/question'
import Configuraciones from './components/Generales/Configuraciones'
import ListaPuestos from './components/Generales/ListaPuestos'
import PlanAccion from './components/Generales/PlanAccion'
import { Nivel_satisfaccion } from './components/Resultados/Nivel_satisfaccion'
import { Comparar_periodo } from './components/Resultados/Comparar_periodo'

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
            index: true,
            element: <Periodo />
          },
          {
            path: '/encuestas/dimensiones',
            element: <Dimensiones />,
            loader: Dimensionloader
          },
          {
            path: '/encuestas/preguntas',
            element: <Preguntas />,
            loader: Questionloader
          },
          {
            path: '/encuestas/escalas',
            element: <Escalasorigin />,
            loader: escalesLoader
          }, {
            path: '/Generales/Configuraciones',
            element: <Configuraciones />
          },
          {
            path: '/Generales/lista_puestos',
            element: <ListaPuestos />
          },
          {
            path: '/Generales/plan_accion',
            element: <PlanAccion />
          },
          {
            path: '/paneladministrador',
            element: <User />,
            loader: usersLoader
          },
          {
            path: '/paneladministrador',
            element: <CompanyList />,
            loader: companylist
          },
          {
            path: '/usuarios/nuevo',
            element: <NewUser />,
            action: newUserAction
          },
          {
            path: '/empresa/nueva',
            element: <NewCompany />,
            action: newcompany
          },
          {
            path: '/periodo',
            element: <Periodo />
          }
          ,
          {
            path: '/resultados/resultado',
            element: <Resultado />
          },
          {
            path: '/resultados/nivel_satisfaccion',
            element: <Nivel_satisfaccion />
          }
          ,
          {
            path: '/resultados/comparar_periodos',
            element: <Comparar_periodo />
          }
        ]
      }
    ],
    errorElement: <div>404 Not Found</div>


  }
])


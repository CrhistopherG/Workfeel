import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import Login from './views/Login'
import Dimensiones from './components/Encuestas/Dimensiones'
import Preguntas from './components/Encuestas/Preguntas'
import Escalas from './components/Encuestas/Escalas'
import Periodo from './components/Periodo/Periodo'
import ProtectedRoute from './auth/ProtectedRoute'


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
            element: <Dimensiones />
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
            path: '/usuarios/ver_todos',
            element: <User />,
            loader: usersLoader
          },
          {
            path: '/usuarios/nuevo',
            element: <NewUser />,
            action: newUserAction
          },
          {
            path: '/periodo',
            element: <Periodo />
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
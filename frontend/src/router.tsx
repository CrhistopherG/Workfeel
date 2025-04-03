import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
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
        path:'/periodo',
        element: <Periodo />
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
        path: '/periodo', // Ruta independiente para Periodo
        element: <Layout />, // Usa el mismo Layout si quieres mantener el diseño
        children: [
            {
                index: true,
                element: <Periodo />
            }
        ]
    }
])
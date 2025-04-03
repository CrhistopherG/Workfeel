import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, { action as newUserAction } from './views/NewUser'
import Login from './views/Login'
import Periodo from "./views/periodo"


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/usuarios',
        element: <Layout />,
        children: [
            {
                index: true,
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
import { createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, {action as newUserAction} from './views/NewUser'
import Login from './views/Login'


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
    }
])
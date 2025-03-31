import { createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import User, { loader as usersLoader } from './views/User'
import NewUser, {action as newUserAction} from './views/NewUser'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <User />,
                loader: usersLoader
            },
            {
                path: '/usuario/nuevo',
                element: <NewUser />,
                action: newUserAction
            }
        ]
    }
])
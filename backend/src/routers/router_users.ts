import { Router } from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../handlers/user'

const router_users: Router = Router()

//routing
router_users.get('/', getUsers)

router_users.get('/:id', getUserById)

router_users.post('/', createUser)

router_users.patch('/:id', updateUser)

router_users.delete('/:id', deleteUser)



export default router_users
import { Router } from 'express'
import { createRol, deleteRol, getRolById, getRoles, updateRol } from '../handlers/rol'

const router_rol: Router = Router()

//routing
router_rol.get('/', getRoles)

router_rol.get('/:id', getRolById)

router_rol.post('/', createRol)

router_rol.patch('/:id', updateRol)

router_rol.delete('/:id', deleteRol)



export default router_rol
import { Router } from 'express'
import {createDepartment, deleteDepartment, getDepartments, getDepartmentById, updateDepartment} from '../handlers/deparment'

const router_department: Router = Router()

//routing
router_department.get('/', getDepartments)

router_department.get('/:id', getDepartmentById)

router_department.post('/', createDepartment)

router_department.patch('/:id', updateDepartment)

router_department.delete('/:id', deleteDepartment)



export default router_department
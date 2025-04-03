import { Router } from 'express'
import {createCompany, deleteCompany, getCompany, getCompanyById, updateCompany} from '../handlers/company'

const router_company: Router = Router()

//routing
router_company.get('/', getCompany)

router_company.get('/:id', getCompanyById)

router_company.post('/', createCompany)

router_company.patch('/:id', updateCompany)

router_company.delete('/:id', deleteCompany)



export default router_company
import { Router } from 'express'
import {createCompany, deleteCompany, getCompanies, getCompanyById, updateCompany} from '../handlers/company'

const router_company: Router = Router()

//routing
router_company.get('/', getCompanies)

router_company.get('/:id', getCompanyById)

router_company.post('/', createCompany)

router_company.patch('/:id', updateCompany)

router_company.delete('/:id', deleteCompany)



export default router_company
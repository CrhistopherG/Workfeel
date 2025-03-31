import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Company from '../models/Company.model'


export const getCompanies= async (req: Request, res: Response) => {
    try {
        const companies = await Company.findAll({
            order: [
                ['company_id', 'ASC']
            ]
        })
        res.json({data: companies})
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const company = await Company.findByPk(id)
        console.log(company);
        

        if(!company) {
            res.status(404).json({data: "Empresa no encontrado"})
            return
        }

        res.json({data: company})
    } catch (error) {
        
    }
}

export const createCompany = async (req: Request, res: Response) => {
        // Validacion
        await check('name')
        .notEmpty()
        .withMessage('El nombre de la compania no puede ir vacio')
        .run(req)
    
    await check('address')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('La direccion no puede ir vacia')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const company = await Company.create(req.body)
    
    res.json({data: company})
}

export const updateCompany = async (req: Request, res: Response) => {
    
}

export const deleteCompany = async (req: Request, res: Response) => {

}
import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Company from '../models/Company.model'


//funcion de obtener todas las compañias ya funciona
export const getCompany= async (req: Request, res: Response) => {
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

//funcion de obtener por id ya funciona
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
        console.log(error);
        res.status(500).json({error: "Error en el servidor"})
    }
}

//funcion de crear ya funciona
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


//funcion de actualizar ya funciona
export const updateCompany = async (req: Request, res: Response) => {
//implementamos nuestro actualizacion de mi update 

try {
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

    const { id } = req.params

    const company = await Company.findByPk(id)

    if(!company) {
        res.status(404).json({data: "Empresa no encontrado"})
        return
    }

    await company.update(req.body)

    res.json({data: company})
} catch (error) {
    console.log(error);
    
}
    res.status(500).json({error: "Error en el servidor"})
    

}

//funcion de eliminar ya funciona
export const deleteCompany = async (req: Request, res: Response) => {
    try {
        console.log(`Petición DELETE recibida para ID: ${req.params.id}`);
        const { id } = req.params;

        const company = await Company.findByPk(id);

        if (!company) {
            res.status(404).json({ data: "Empresa no encontrada" });
            return;
        }

        await company.destroy();

        res.json({ data: "Empresa eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}
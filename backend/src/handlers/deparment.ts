import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Department from '../models/Department.model'


export const getDepartments= async (req: Request, res: Response) => {
    try {
        const departments = await Department.findAll({
            order: [
                ['department_id', 'ASC']
            ]
        })
        res.json({data: departments})
    } catch (error) {
        console.log(error);
        
    }
}

export const getDepartmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const department = await Department.findByPk(id)
        console.log(department);
        

        if(!department) {
            res.status(404).json({data: "Usuario no encontrado"})
            return
        }

        res.json({data: department})
    } catch (error) {
        
    }
}

export const createDepartment = async (req: Request, res: Response) => {
        // Validacion
        await check('name')
        .notEmpty()
        .withMessage('El nombre del departamento no puede ir vacio')
        .run(req)
    
    await check('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('La descripcion del departamento no puede ir vacio')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const departament = await Department.create(req.body)
    
    res.json({data: departament})
}

export const updateDepartment = async (req: Request, res: Response) => {
    
}

export const deleteDepartment = async (req: Request, res: Response) => {

}


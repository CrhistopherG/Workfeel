import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Job from '../models/Job.model'


export const getJobs= async (req: Request, res: Response) => {
    try {
        const roles = await Job.findAll({
            order: [
                ['rol_id', 'ASC']
            ]
        })
        res.json({data: roles})
    } catch (error) {
        console.log(error);
        
    }
}

export const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const job = await Job.findByPk(id)
        console.log(job);
        

        if(!job) {
            res.status(404).json({data: "Usuario no encontrado"})
            return
        }

        res.json({data: job})
    } catch (error) {
        
    }
}

export const createJob = async (req: Request, res: Response) => {
        // Validacion
        await check('name')
        .notEmpty()
        .withMessage('El nombre del puesto no puede ir vacio')
        .run(req)
    
    await check('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('El puesto no puede ir vacio')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const job = await Job.create(req.body)
    
    res.json({data: job})
}

export const updateJob = async (req: Request, res: Response) => {
    
}

export const deleteJob = async (req: Request, res: Response) => {

}


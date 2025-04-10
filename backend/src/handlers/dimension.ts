import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Dimension from '../models/Dimension.model'
import Question from '../models/Question.model'
import { error } from 'console'

export const getDimensions= async (req: Request, res: Response) => {
    try {
        const dimensions = await Dimension.findAll({
            order: [
                ['dimension_id', 'ASC']
            ]
        })
        res.json({data: dimensions})
    } catch (error) {
        console.log(error);
        
    }
}

export const getDimensionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const dimension = await Dimension.findByPk(id)
        console.log(dimension);
        

        if(!dimension) {
            res.status(404).json({data: "Dimension no encontrado"})
            return
        }

        res.json({data: dimension})
    } catch (error) {
        
    }
}

export const createDimension = async (req: Request, res: Response) => {
        // Validacion
        await check('name')
        .notEmpty()
        .withMessage('El nombre de la dimension no puede ir vacio')
        .run(req)
    
    await check('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('La descripcion de la dimension no puede ir vacio')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const dimension = await Dimension.create(req.body)
    res.json({data: dimension})
}

export const updateDimension = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const dimension = await Dimension.findByPk(id)

        if(!dimension) {
            res.status(404).json({data: "Dimension no encontrado"})
            return
        }

        await dimension.update(req.body)
        res.json({data: dimension})
    } catch (error) {
        
    }
}
export const deleteDimension = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const dimenision = await Dimension.findByPk(id)
        console.log(dimenision)

        if (!dimenision) {
            res.status(400).json({data:error})
            return
        }
        await dimenision.destroy();

        res.json({data:"dimension eliminada" , dimenision})
    } catch (error) {
        console.log("error del servidor")
    }
}
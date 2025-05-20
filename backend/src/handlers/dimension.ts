import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Dimension from '../models/Dimension.model'

//metodos get de nuestro dimension 
export const getDimensions = async (req: Request, res: Response) => {
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

//buscar dimension por id
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
        console.log(error);
        
    }
}

// Crear dimensión
export const createDimension = async (req: Request, res: Response) => {
    try {
        const { name, description, status, period_id } = req.body
        const newDimension = await Dimension.create({
            name,
            description,
            status: status === true || status === "true", // <-- aquí
            period_id
        })
        res.status(201).json({data: newDimension})
    } catch (error) {
        console.log(error);
        res.status(500).json({data: "Error al crear la dimensión"})
    }
}

//actualizar dimension
export const updateDimension = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, description, status, period_id } = req.body
        const dimension = await Dimension.findByPk(id)

        if(!dimension) {
            res.status(404).json({data: "Dimension no encontrado"})
            return
        }

        await dimension.update({
            name,
            description,
            status,
            period_id
        })
        res.json({data: dimension})
    } catch (error) {
        console.log(error);
        res.status(500).json({data: "Error al actualizar la dimensión"})
    }
}

//eliminar dimension
export const deleteDimension = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const dimension = await Dimension.findByPk(id)

        if(!dimension) {
            res.status(404).json({data: "Dimension no encontrado"})
            return
        }

        await dimension.destroy()
        res.json({data: "Dimension eliminada"})
    } catch (error) {
        console.log(error);
        res.status(500).json({data: "Error al eliminar la dimensión"})
    }
}


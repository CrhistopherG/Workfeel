import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Dimension from '../models/Dimension.model'
import Question from '../models/Question.model'
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
        const dimension = await Dimension.findByPk(id);
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
            // Convertir el valor de status a booleano
            status: status === true || status === "true" || status === 1 || status === "1",
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

        // Normalizar el status igual que en create
        const normalizedStatus = status === true || status === "true" || status === 1 || status === "1"
        
        await dimension.update({
            name,
            description,
            status: normalizedStatus, // Usar el valor normalizado
            period_id
        })
        
        console.log("Dimensión actualizada:", dimension.toJSON()); // Log para depuración
        
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

        // Verificar si hay preguntas asociadas a esta dimensión
        const questionsCount = await Question.count({ where: { dimension_id: id } });
        if (questionsCount > 0) {
            res.status(400).json({ data: "No se puede eliminar la dimensión porque tiene preguntas asociadas. Elimina primero las preguntas." });
            return;
        }

        await dimension.destroy()
        res.json({data: "Dimension eliminada"})
    } catch (error) {
        console.log(error);
        res.status(500).json({data: "Error al eliminar la dimensión"})
    }
}

// DimensionController.ts

export const getActiveDimensions = async (req: Request, res: Response) => {
  try {
    const activeDimensions = await Dimension.findAll({ where: { status: true } });
    res.json({ data: activeDimensions }); // <-- así
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dimensiones activas" });
  }
};


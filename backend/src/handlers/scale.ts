import { Request , Response } from "express";
import Scale from "../models/Scale.model";
import { check, validationResult } from "express-validator";

// Obtener todas las escalas
export const getScales = async (req: Request, res: Response) => {
    try {
        const scales = await Scale.findAll({
            order: [['scale_id', 'ASC']]
        })
        res.json({data: scales})
    } catch (error) {
        console.log(error);
    }
}

// Obtener una escala por ID
export const getScaleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const scale = await Scale.findByPk(id)
        if(!scale) {
            res.status(404).json({data: "Opción/Escala no encontrada"})
            return
        }
        res.json({data: scale})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la opción/escala.' });
    }
}

//obtenemos nuestra escala por id
export const getScalesByQuestion = async (req: Request, res: Response) => {
  try {
    const { question_id } = req.params;
    const scales = await Scale.findAll({ where: { question_id } });
    res.json({ data: scales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las opciones/escala.' });
  }
};

// Crear una nueva escala
export const createScale = async (req: Request, res: Response) => {
  try {
    // req.body debe ser un array de opciones o escalas
    // [{question_id, value, description}, ...]
    const scales = await Scale.bulkCreate(req.body);
    res.status(201).json({ data: scales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear las opciones/escala.' });
  }
};

// Actualizar una escala
export const updateScale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const scale = await Scale.findByPk(id);
    if (!scale) {
      res.status(404).json({ message: 'Opción/Escala no encontrada' });
      return;
    }
    await scale.update(req.body);
    res.json({ data: scale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la opción/escala.' });
  }
};

// Eliminar una escala
export const deleteScale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const scale = await Scale.findByPk(id);
    if (!scale) {
      res.status(404).json({ message: 'Opción/Escala no encontrada' });
      return;
    }
    await scale.destroy();
    res.json({ message: 'Opción/Escala eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la opción/escala.' });
  }
};
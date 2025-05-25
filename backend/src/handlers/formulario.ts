import { Request, Response } from 'express';
import Period from '../models/Period.model';
import Dimension from '../models/Dimension.model';
import Question from '../models/Question.model';
import Scale from '../models/Scale.model';

export const getFormularioByPeriod = async (req: Request, res: Response) => {
  try {
    const { periodId } = req.params;

    const period = await Period.findByPk(periodId, {
      attributes: ['period_id', 'name', 'status', 'date_start', 'date_end'],
      include: [{
        model: Dimension,
        attributes: ['dimension_id', 'name', 'description', 'status'],
        include: [{
          model: Question,
          attributes: ['question_id', 'content'],
          include: [{
            model: Scale,
            attributes: ['scale_id', 'value', 'description']
          }]
        }]
      }]
    });

    if (!period) {
      res.status(404).json({ success: false, message: "Periodo no encontrado" });
        return;
    }

    res.json({ success: true, data: period });
  } catch (error) {
    console.error('Error en getFormularioByPeriod:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la estructura del formulario',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
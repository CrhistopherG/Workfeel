import { Request, Response } from 'express';
import * as periodService from '../Services/periodService'


export const getPeriods = async (req: Request, res: Response): Promise<any> => {
    try{
        const { userId } = req.params;
        const periods = await periodService.getPeriodsByUserId(userId);

        return res.json({
            success: true,
            data: periods
        });

    }catch(error: any){
        console.error('PeriodController.GetPeriods.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false, 
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

export const createPeriod = async (req: Request, res: Response): Promise<any> =>{
    try{
        const { userId } = req.params;
        const { name, date_start, date_end, company_id } = req.body;

        const newPeriod = await periodService.createPeriod(userId, { name, date_start, date_end, company_id });

        return res.status(201).json({
            success: true,
            message: 'Periodo creado correctamente',
            data: newPeriod
        });

    }catch(error: any){
        console.error('PeriodController.GetPeriods.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false, 
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

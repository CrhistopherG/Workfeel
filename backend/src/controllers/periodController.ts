import { Request, Response } from 'express';
import * as periodService from '../Services/periodService'


export const getPeriod = async (req: Request, res:Response): Promise<any> => {

    try{
        const { userId, periodId } = req.params;
        const period = await periodService.getPeriodById(userId, periodId);

        return res.json({
            success: true,
            data: period
        });

    }catch(error: any){
        console.error('PeriodController.GetPeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false, 
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }

}

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
        console.error('PeriodController.CreatePeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false, 
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

export const detelePeriod = async (req: Request, res: Response): Promise<any> =>{
    try{
        const { userId, periodId } = req.params;

        await periodService.deletePeriod(userId, periodId);

        return res.status(200).json({
            success: true, 
            message: 'Period deleted'
        })

    }catch(error: any){
        console.error('PeriodController.DeletePeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false, 
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}


export const updatePeriod = async (req: Request, res: Response): Promise<any> => {
    try{
        const { userId, periodId } = req.params;
        const { name, date_start, date_end, company_id, status} = req.body;

        const periodUpdated = await periodService.updatePeriod(userId, periodId, { name, date_start, date_end, company_id, status});

        return res.status(200).json({
            success: true, 
            message: 'Period updated',
            data: periodUpdated
        });

    }catch(error: any){
        console.error('PeriodController.UpdatePeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false, 
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
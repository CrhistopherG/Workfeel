import { Request, Response } from 'express';
import User from '../models/Users.model';
import Period from "../models/Period.model";

export const getPeriods = async (req: Request, res: Response) => {
    try {
        // 1. Obtener user_id de los parámetros de la ruta (no de localStorage)
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({
                success: false,
                message: 'Se requiere el ID de usuario'
            });
            return
        }

        // 2. Obtener usuario desde la base de datos
        const user = await User.findByPk(userId, {
            attributes: ['user_id', 'company_id'],
            raw: true
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
            return
        }

        // 3. Verificar company_id
        if (!user.company_id) {
            res.status(400).json({
                success: false,
                message: 'El usuario no tiene compañía asignada'
            });
            return 
        }

        // 4. Buscar periodos
        const periods = await Period.findAll({
            where: { 
                company_id: user.company_id 
            },
            attributes: ['period_id', 'name', 'status', 'date_start', 'date_end'],
            order: [['date_start', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: periods || []
        });
        return 

    } catch (error) {
        console.error('Error en getPeriods:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
        return 
    }
};

export const createPeriod = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el ID de usuario'
            });
        }

        // Buscar el usuario por su ID
        const user = await User.findByPk(userId, {
            attributes: ['user_id', 'company_id'],
            raw: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        if (!user.company_id) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no tiene compañía asignada'
            });
        }

        // Crear el período con el company_id del usuario
        const newPeriod = await Period.create({
            ...req.body,
            company_id: user.company_id
        });

        return res.status(201).json({
            success: true,
            message: 'Periodo creado correctamente',
            data: newPeriod
        });

    } catch (error) {
        console.error('Error en createPeriod:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear el período',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

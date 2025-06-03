// controllers/jobController.ts
import { Request, Response } from 'express';
import Job from '../models/Job.model';
import Department from '../models/Department.model';
import Company from '../models/Company.model';
import User from '../models/Users.model'; // Asumiendo que tienes un modelo de usuario

// Listar puestos por usuario (por company_id asociada al usuario)
export const getPuestosByUser = async (req: Request, res: Response) : Promise<any> => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Company }],
    });

    if (!user || !user.company_id) {
      return res.status(404).json({ message: 'Usuario o empresa no encontrada' });
    }

    const puestos = await Job.findAll({
      include: {
        model: Department,
        where: { company_id: user.company_id },
      },
    });

    res.json(puestos);
  } catch (error) {
    console.error('Error al obtener puestos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear nuevo puesto
export const createPuesto = async (req: Request, res: Response) => {
  const { name, description, department_id } = req.body;

  try {
    const newJob = await Job.create({
      name,
      description,
      department_id,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error al crear puesto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

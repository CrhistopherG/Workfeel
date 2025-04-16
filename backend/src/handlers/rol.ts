import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Rol from '../models/Rol.model'


export const getRoles= async (req: Request, res: Response) => {
    try {
        const roles = await Rol.findAll({
          attributes: ['rol_id', 'name']
        });
        res.json(roles);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getRolById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const rol = await Rol.findByPk(id)
        console.log(rol);
        

        if(!rol) {
            res.status(404).json({data: "Usuario no encontrado"})
            return
        }

        res.json({data: rol})
    } catch (error) {
        
    }
}

export const createRol = async (req: Request, res: Response) => {
        // Validacion
        await check('name')
        .notEmpty()
        .withMessage('El nombre del rol no puede ir vacio')
        .run(req)
    
    await check('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('El rol no puede ir vacio')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const rol = await Rol.create(req.body)
    
    res.json({data: rol})
}

export const updateRol = async (req: Request, res: Response) => {
    
}

export const deleteRol = async (req: Request, res: Response) => {

}


import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import User from '../models/Users.model';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            order: [
                ['user_id', 'ASC']
            ]
        })
        res.json({data: users})

    } catch (error) {
        console.log(error);
    }
}


export const getUserById = async (req : Request, res : Response) => {
    try {
        
        const { id } = req.params
        const user = await User.findByPk(id, {
            include: ['rol']
        })
        
        if(!user) {
            res.status(404).json({
                error: "Usuario no encontrado"
            })
            return
        }

        res.json({data: user})
        

    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (req : Request, res : Response) => {
    
    // Validacion
    await check('name')
        .notEmpty()
        .withMessage('El nombre de usuario no puede ir vacio')
        .run(req)

    await check('password')
        .notEmpty()
        .withMessage('La contraseña no puede ir vacia')
        .isString()
        .withMessage('Valor no valido')
        .run(req)

    await check('email')
        .isEmail()
        .withMessage('Email no valido')
        .notEmpty()
        .withMessage('El email no puede ir vacio')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const user = await User.create(req.body)
    
    res.json({data: user})
}

export const updateUser = async (req : Request, res : Response) => {
    
    // Validacion
    await check('name')
        .notEmpty()
        .withMessage('El nombre de usuario no puede ir vacio')
        .run(req)

    await check('password')
        .notEmpty()
        .withMessage('La contraseña no puede ir vacia')
        .isString()
        .withMessage('Valor no valido')
        .run(req)

    await check('email')
        .isEmail()
        .withMessage('Email no valido')
        .notEmpty()
        .withMessage('El email no puede ir vacio')
        .run(req)
    
    await check('rol_id')
        .isNumeric()
        .withMessage('')
        .notEmpty()
        .withMessage('El rol no puede ir vacio')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const user = await User.create(req.body)
    
    res.json({data: user})
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params
        const user = await User.findByPk(id)
        
        if(!user) {
            res.status(404).json({
                error: "Usuario no encontrado"
            })
            return
        }

        await user.destroy()
        res.json({data: "Producto eliminado"})
        

    } catch (error) {
        console.log(error);
    }
}
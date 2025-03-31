import { Request, Response} from 'express'
import { check, validationResult } from 'express-validator'
import Product from '../models/Product.model';

export const createProduct = async (req : Request, res : Response) => {
    
    // Validacion
    await check('name')
        .notEmpty()
        .withMessage('El nombre de producto no puede ir vacio')
        .run(req)

    await check('price')
        .notEmpty()
        .withMessage('El precio de producto no puede ir vacio')
        .isNumeric()
        .withMessage('Valor no valido')
        .custom(value => value > 0)
        .withMessage('Precio no valido')
        .run(req)
    
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return 
    }

    const product = await Product.create(req.body)
    
    res.json({data: product})
}
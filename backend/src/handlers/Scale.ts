import { Request, Response } from "express";
import Scale from "../models/Scale.model";
import { check, validationResult } from "express-validator";
import { readSync } from "fs";

//funcion para mostrar los datos
export const getScale= async (req: Request, res: Response) => {

    try {
        const scales = await Scale.findAll({
            order: [
                ['scale_id', 'ASC']
            ]
        })
        res.json({data: scales})
    } catch (error) {
        console.log("no se pude mostrar:",error);
    }
}
//mostrar datos por id
export const getScaleById= async(req: Request, res:Response)=>{
    try {
        const {id}=req.params
        console.log('los datos se verificaron correctamente' , id)
        const escale = await Scale.findByPk(id)
        console.log(escale)

        if(!escale){
            res.status(400).json({data:"escale no encontrados"})
        }

        res.json({data: escale})
    } catch (error) {
        console.log("error al servidor")
    }
}

//funcion para agregar los valores en mi escalas
export const createScale= async (req: Request, res: Response) => {
    const {value, description} = req.body
    try {
        const scale = await Scale.create({
            value,
            description
        })
        res.json({data: scale})
    } catch (error) {
        console.log("no se pude agregar:",error);
    }
}

//funcion para editar escala 
export const updateScale= async (req: Request, res: Response) => {
    try {
        //validation de mi entidad
        await check('value')
        .notEmpty()
        .withMessage("el valor no tiene que ser nulo ")
        .run(req)


        //validation de atribute description

        await check('description')
        .notEmpty()
        .withMessage("el valor no puede ser vacio")
        .isString()
        .run(req)

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({error:Array()})
            return
        }

        const { id}= req.params

        const scale = await Scale.findByPk(id)

        if(!scale){
            res.status(400).json({data:"no se pudol actualizar datos"})
        }

        await scale .update(req.body)
    } catch (error) {
        console.log("erro con el servidor" , error)
    }
}

//funcion para eliminar los datos de mi scale 

export const deletescale= async (req: Request , res:Response)=>{

    try {
        console.log(`peticion de Delete recibida con el id ${req.params.id}`)
    const {id}=req.params

    const scale = await Scale.findByPk(id)

    if(!scale){
        res.status(400).json({data:"error no se busco las escalas"})
        return
    }

    await scale.destroy();
    res.json({data:"escale eliminada  correctamento "})
    } catch (error) {
        console.log("Error con el servidor" , error)
    }
    
}
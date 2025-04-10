import { Request, Response } from "express";
import { check, validationResult } from 'express-validator'
import Question from "../models/Question.model";
import { error } from "console";
import { compileFunction } from "vm";
import Company from "../models/Company.model";

//crearemos un producto 
export const getquestions = async (req: Request, res: Response) => {
    try {
      // Consulta a la base de datos
      const question = await Question.findAll({
        order: [["question_id", "ASC"]],
      });
  
      // Envía la respuesta con los datos obtenidos
      res.json({ data: question });
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
  
      // Envía una respuesta de error al cliente
      res.status(500).json({ error: "Error al obtener las preguntas" });
    }
};


//funcion para obtener datos por id 
export const getquestionById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const question = await Question.findByPk(id);
  
      if (!question) {
        res.status(404).json({ error: "Pregunta no encontrada" });
        return; // Asegúrate de detener la ejecución aquí
      }
  
      res.json({ data: question });
    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
      res.status(500).json({ error: "Error al obtener la pregunta" });
    }
};

//funcion para crear datos 
export const createquestion = async (req: Request, res: Response) => {
    //validacion de mi emtodad de question 

    try {
        await check('content')
            .notEmpty()
            .isString()
            .withMessage("El contendio no puede ir vacio ")
            .run(req)

        let error = validationResult(req)

        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
            return
        }

        const question = await Question.create(req.body)
        res.json({ data: question })
    } catch (error) {
        console.log("error de nuestro base de preguntas ", error)
    }



}

//funcion para actualizar datos
export const updatequestion = async (req: Request, res: Response) => {
    try {
        //validation entidaa question 
        await check('contect')
        .notEmpty()
        .withMessage("el dato no puede ir vacio ")
        .isString()
        .run(req)

        let error= validationResult(req)

        if(!error.isEmpty()){
            res.status(400). json ({error: error.array()})
        }

        const {id}= req.params

        const question = await Question.findByPk(id)

        if(!question){
            res.status(400).json({data: "error question not exist!"})
            return
        }

        await question.update(req.body)
        res.json({data:question})
    } catch (error) {
        console.log("error de la base de datos update" , error)
    }
}


//funcion para eliminar datos de mi table 
export const deletequestion = async (req: Request, res: Response) => {
    try {
        console.log(`Peticion DELETE  recibida para el ID ${req.params.id}`);
        const {id}= req.params
        const question = await Question.findByPk(id);
        if(!question){
            res.status(400).json({error:error})
            return
        }

        await question.destroy();
        res.json({data:"empresa eliminadoa" , question})
    } catch (error) {
        console.log("error con el servidor" , error)
    }
}    

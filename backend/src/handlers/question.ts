import { Request, Response } from "express";
import Question from "../models/Question.model";
import Dimension from "../models/Dimension.model";

// Obtener todas las preguntas
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll({
      order: [["question_id", "ASC"]],
    });
    res.json({ data: questions });
  } catch (error) {
    console.error("Error en getQuestions:", error);
    res.status(500).json({ data: "Error al obtener preguntas" });
  }
};

// Obtener una pregunta por ID
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) {
      res.status(404).json({ data: "Pregunta no encontrada" });
      return;
    }

    res.json({ data: question });
  } catch (error) {
    console.error("Error en getQuestionById:", error);
    res.status(500).json({ data: "Error al buscar la pregunta" });
  }
};

// Obtener preguntas con dimensiones activas
export const getQuestionsWithActiveDimensions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll({
      include: {
        model: Dimension,
        where: { status: true },
      },
      order: [["question_id", "ASC"]],
    });

    res.json({ data: questions });
  } catch (error) {
    console.error("Error en getQuestionsWithActiveDimensions:", error);
    res.status(500).json({ data: "Error al obtener preguntas" });
  }
};

// Crear una nueva pregunta
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { content, dimension_id } = req.body;

    // Validar si la dimensión está activa
    const dimension = await Dimension.findByPk(dimension_id);

    console.log("Dimension encontrada:", dimension);

  const statusValue = dimension ? String(dimension.get("status")).toLowerCase() : "";
const isActive =
  dimension &&
  ["true", "1", "abierto"].includes(statusValue) ||
  dimension.get("status") === true;

    if (!isActive) {
      res.status(400).json({ message: 'La dimensión está cerrada o no existe.' });
      return;
    }

    const newQuestion = await Question.create({
      content,
      dimension_id
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la pregunta.' });
  }
};

// Actualizar una pregunta
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, dimension_id } = req.body;

    const question = await Question.findByPk(id);
    if (!question) {
      res.status(404).json({ data: "Pregunta no encontrada" });
      return;
    }

    // Si se quiere cambiar la dimensión, valida que esté activa
    if (dimension_id) {
      const dimension = await Dimension.findByPk(dimension_id);
      const statusValue = dimension ? String(dimension.get("status")).toLowerCase() : "";
      const isActive =
        dimension &&
        (
          statusValue === "true" ||
          statusValue === "1" ||
          statusValue === "abierto" ||
          dimension.get("status") === true
        );
      if (!isActive) {
        res.status(400).json({ data: "La dimensión está cerrada o no existe" });
        return;
      }
    }

    await question.update({ content, dimension_id });
    res.json({ data: question });
  } catch (error) {
    console.error("Error en updateQuestion:", error);
    res.status(500).json({ data: "Error al actualizar la pregunta" });
  }
};

// Eliminar una pregunta
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) {
      res.status(404).json({ data: "Pregunta no encontrada" });
      return;
    }

    await question.destroy();
    res.json({ data: "Pregunta eliminada" });
  } catch (error) {
    console.error("Error en deleteQuestion:", error);
    res.status(500).json({ data: "Error al eliminar la pregunta" });
  }
};
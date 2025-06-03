"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestionsWithActiveDimensions = exports.getQuestionById = exports.getQuestions = void 0;
const Question_model_1 = __importDefault(require("../models/Question.model"));
const Dimension_model_1 = __importDefault(require("../models/Dimension.model"));
const Scale_model_1 = __importDefault(require("../models/Scale.model"));
// Obtener todas las preguntas
const getQuestions = async (req, res) => {
    try {
        const questions = await Question_model_1.default.findAll({
            order: [["question_id", "ASC"]],
        });
        res.json({ data: questions });
    }
    catch (error) {
        console.error("Error en getQuestions:", error);
        res.status(500).json({ data: "Error al obtener preguntas" });
    }
};
exports.getQuestions = getQuestions;
// Obtener una pregunta por ID
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question_model_1.default.findByPk(id);
        if (!question) {
            res.status(404).json({ data: "Pregunta no encontrada" });
            return;
        }
        res.json({ data: question });
    }
    catch (error) {
        console.error("Error en getQuestionById:", error);
        res.status(500).json({ data: "Error al buscar la pregunta" });
    }
};
exports.getQuestionById = getQuestionById;
// Obtener preguntas con dimensiones activas
const getQuestionsWithActiveDimensions = async (req, res) => {
    try {
        const questions = await Question_model_1.default.findAll({
            include: {
                model: Dimension_model_1.default,
                where: { status: true },
            },
            order: [["question_id", "ASC"]],
        });
        res.json({ data: questions });
    }
    catch (error) {
        console.error("Error en getQuestionsWithActiveDimensions:", error);
        res.status(500).json({ data: "Error al obtener preguntas" });
    }
};
exports.getQuestionsWithActiveDimensions = getQuestionsWithActiveDimensions;
// Crear una nueva pregunta
const createQuestion = async (req, res) => {
    try {
        const { content, dimension_id } = req.body;
        // Validar si la dimensión está activa
        const dimension = await Dimension_model_1.default.findByPk(dimension_id);
        console.log("Dimension encontrada:", dimension);
        const statusValue = dimension ? String(dimension.get("status")).toLowerCase() : "";
        const isActive = dimension &&
            ["true", "1", "abierto"].includes(statusValue) ||
            dimension.get("status") === true;
        if (!isActive) {
            res.status(400).json({ message: 'La dimensión está cerrada o no existe.' });
            return;
        }
        const newQuestion = await Question_model_1.default.create({
            content,
            dimension_id
        });
        res.status(201).json(newQuestion);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la pregunta.' });
    }
};
exports.createQuestion = createQuestion;
// Actualizar una pregunta
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, dimension_id } = req.body;
        const question = await Question_model_1.default.findByPk(id);
        if (!question) {
            res.status(404).json({ data: "Pregunta no encontrada" });
            return;
        }
        // Si se quiere cambiar la dimensión, valida que esté activa
        if (dimension_id) {
            const dimension = await Dimension_model_1.default.findByPk(dimension_id);
            const statusValue = dimension ? String(dimension.get("status")).toLowerCase() : "";
            const isActive = dimension &&
                (statusValue === "true" ||
                    statusValue === "1" ||
                    statusValue === "abierto" ||
                    dimension.get("status") === true);
            if (!isActive) {
                res.status(400).json({ data: "La dimensión está cerrada o no existe" });
                return;
            }
        }
        await question.update({ content, dimension_id });
        res.json({ data: question });
    }
    catch (error) {
        console.error("Error en updateQuestion:", error);
        res.status(500).json({ data: "Error al actualizar la pregunta" });
    }
};
exports.updateQuestion = updateQuestion;
// Eliminar una pregunta
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question_model_1.default.findByPk(id);
        if (!question) {
            res.status(404).json({ data: "Pregunta no encontrada" });
            return;
        }
        //verificar si hay escalas asociadas a esta preguntas 
        const scalesCount = await Scale_model_1.default.count({ where: { question_id: id } });
        if (scalesCount > 0) {
            res.status(400).json({ data: "No se puede eliminar la pregunta porque tiene escalas asociadas. Elimina primero las escalas." });
            return;
        }
        await question.destroy();
        res.json({ data: "Pregunta eliminada" });
    }
    catch (error) {
        console.error("Error en deleteQuestion:", error);
        res.status(500).json({ data: "Error al eliminar la pregunta" });
    }
};
exports.deleteQuestion = deleteQuestion;
//# sourceMappingURL=question.js.map
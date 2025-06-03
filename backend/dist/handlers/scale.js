"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScale = exports.updateScale = exports.createScale = exports.getScalesByQuestion = exports.getScaleById = exports.getScales = void 0;
const Scale_model_1 = __importDefault(require("../models/Scale.model"));
// Obtener todas las escalas
const getScales = async (req, res) => {
    try {
        const scales = await Scale_model_1.default.findAll({
            order: [['scale_id', 'ASC']]
        });
        res.json({ data: scales });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getScales = getScales;
// Obtener una escala por ID
const getScaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const scale = await Scale_model_1.default.findByPk(id);
        if (!scale) {
            res.status(404).json({ data: "Opción/Escala no encontrada" });
            return;
        }
        res.json({ data: scale });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la opción/escala.' });
    }
};
exports.getScaleById = getScaleById;
//obtenemos nuestra escala por id
const getScalesByQuestion = async (req, res) => {
    try {
        const { question_id } = req.params;
        const scales = await Scale_model_1.default.findAll({ where: { question_id } });
        res.json({ data: scales });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las opciones/escala.' });
    }
};
exports.getScalesByQuestion = getScalesByQuestion;
// Crear una nueva escala
const createScale = async (req, res) => {
    try {
        // req.body debe ser un array de opciones o escalas
        // [{question_id, value, description}, ...]
        const scales = await Scale_model_1.default.bulkCreate(req.body);
        res.status(201).json({ data: scales });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear las opciones/escala.' });
    }
};
exports.createScale = createScale;
// Actualizar una escala
const updateScale = async (req, res) => {
    try {
        const { id } = req.params;
        const scale = await Scale_model_1.default.findByPk(id);
        if (!scale) {
            res.status(404).json({ message: 'Opción/Escala no encontrada' });
            return;
        }
        await scale.update(req.body);
        res.json({ data: scale });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la opción/escala.' });
    }
};
exports.updateScale = updateScale;
// Eliminar una escala
const deleteScale = async (req, res) => {
    try {
        const { id } = req.params;
        const scale = await Scale_model_1.default.findByPk(id);
        if (!scale) {
            res.status(404).json({ message: 'Opción/Escala no encontrada' });
            return;
        }
        await scale.destroy();
        res.json({ message: 'Opción/Escala eliminada' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la opción/escala.' });
    }
};
exports.deleteScale = deleteScale;
//# sourceMappingURL=scale.js.map
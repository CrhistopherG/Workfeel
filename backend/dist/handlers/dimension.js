"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveDimensions = exports.deleteDimension = exports.updateDimension = exports.createDimension = exports.getDimensionById = exports.getDimensions = void 0;
const Dimension_model_1 = __importDefault(require("../models/Dimension.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
//metodos get de nuestro dimension 
const getDimensions = async (req, res) => {
    try {
        const dimensions = await Dimension_model_1.default.findAll({
            order: [
                ['dimension_id', 'ASC']
            ]
        });
        res.json({ data: dimensions });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getDimensions = getDimensions;
//buscar dimension por id
const getDimensionById = async (req, res) => {
    try {
        const { id } = req.params;
        const dimension = await Dimension_model_1.default.findByPk(id);
        console.log(dimension);
        if (!dimension) {
            res.status(404).json({ data: "Dimension no encontrado" });
            return;
        }
        res.json({ data: dimension });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getDimensionById = getDimensionById;
// Crear dimensión
const createDimension = async (req, res) => {
    try {
        const { name, description, status, period_id } = req.body;
        const newDimension = await Dimension_model_1.default.create({
            name,
            description,
            // Convertir el valor de status a booleano
            status: status === true || status === "true" || status === 1 || status === "1",
            period_id
        });
        res.status(201).json({ data: newDimension });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ data: "Error al crear la dimensión" });
    }
};
exports.createDimension = createDimension;
//actualizar dimension
const updateDimension = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status, period_id } = req.body;
        const dimension = await Dimension_model_1.default.findByPk(id);
        if (!dimension) {
            res.status(404).json({ data: "Dimension no encontrado" });
            return;
        }
        // Normalizar el status igual que en create
        const normalizedStatus = status === true || status === "true" || status === 1 || status === "1";
        await dimension.update({
            name,
            description,
            status: normalizedStatus, // Usar el valor normalizado
            period_id
        });
        console.log("Dimensión actualizada:", dimension.toJSON()); // Log para depuración
        res.json({ data: dimension });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ data: "Error al actualizar la dimensión" });
    }
};
exports.updateDimension = updateDimension;
//eliminar dimension
const deleteDimension = async (req, res) => {
    try {
        const { id } = req.params;
        const dimension = await Dimension_model_1.default.findByPk(id);
        if (!dimension) {
            res.status(404).json({ data: "Dimension no encontrado" });
            return;
        }
        // Verificar si hay preguntas asociadas a esta dimensión
        const questionsCount = await Question_model_1.default.count({ where: { dimension_id: id } });
        if (questionsCount > 0) {
            res.status(400).json({ data: "No se puede eliminar la dimensión porque tiene preguntas asociadas. Elimina primero las preguntas." });
            return;
        }
        await dimension.destroy();
        res.json({ data: "Dimension eliminada" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ data: "Error al eliminar la dimensión" });
    }
};
exports.deleteDimension = deleteDimension;
// DimensionController.ts
const getActiveDimensions = async (req, res) => {
    try {
        const activeDimensions = await Dimension_model_1.default.findAll({ where: { status: true } });
        res.json({ data: activeDimensions }); // <-- así
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener dimensiones activas" });
    }
};
exports.getActiveDimensions = getActiveDimensions;
//# sourceMappingURL=dimension.js.map
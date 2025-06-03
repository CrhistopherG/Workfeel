"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPuesto = exports.getPuestosByUser = void 0;
const Job_model_1 = __importDefault(require("../models/Job.model"));
const Department_model_1 = __importDefault(require("../models/Department.model"));
const Company_model_1 = __importDefault(require("../models/Company.model"));
const Users_model_1 = __importDefault(require("../models/Users.model")); // Asumiendo que tienes un modelo de usuario
// Listar puestos por usuario (por company_id asociada al usuario)
const getPuestosByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await Users_model_1.default.findByPk(userId, {
            include: [{ model: Company_model_1.default }],
        });
        if (!user || !user.company_id) {
            return res.status(404).json({ message: 'Usuario o empresa no encontrada' });
        }
        const puestos = await Job_model_1.default.findAll({
            include: {
                model: Department_model_1.default,
                where: { company_id: user.company_id },
            },
        });
        res.json(puestos);
    }
    catch (error) {
        console.error('Error al obtener puestos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.getPuestosByUser = getPuestosByUser;
// Crear nuevo puesto
const createPuesto = async (req, res) => {
    const { name, description, department_id } = req.body;
    req.body.description = "Lorem ipsum";
    try {
        const newJob = await Job_model_1.default.create({
            name,
            description,
            department_id,
        });
        res.status(201).json(newJob);
    }
    catch (error) {
        console.error('Error al crear puesto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.createPuesto = createPuesto;
//# sourceMappingURL=jobController.js.map
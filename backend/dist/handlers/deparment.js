"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getDepartmentById = exports.getDepartments = void 0;
const express_validator_1 = require("express-validator");
const Department_model_1 = __importDefault(require("../models/Department.model"));
const getDepartments = async (req, res) => {
    try {
        const departments = await Department_model_1.default.findAll({
            order: [
                ['department_id', 'ASC']
            ]
        });
        res.json({ data: departments });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getDepartments = getDepartments;
const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department_model_1.default.findByPk(id);
        console.log(department);
        if (!department) {
            res.status(404).json({ data: "Usuario no encontrado" });
            return;
        }
        res.json({ data: department });
    }
    catch (error) {
    }
};
exports.getDepartmentById = getDepartmentById;
const createDepartment = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre del departamento no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('La descripcion del departamento no puede ir vacio')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const departament = await Department_model_1.default.create(req.body);
    res.json({ data: departament });
};
exports.createDepartment = createDepartment;
const updateDepartment = async (req, res) => {
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (req, res) => {
};
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=deparment.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRolById = exports.getRoles = void 0;
const express_validator_1 = require("express-validator");
const Rol_model_1 = __importDefault(require("../models/Rol.model"));
const getRoles = async (req, res) => {
    try {
        const roles = await Rol_model_1.default.findAll({
            attributes: ['rol_id', 'name']
        });
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getRoles = getRoles;
const getRolById = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol_model_1.default.findByPk(id);
        console.log(rol);
        if (!rol) {
            res.status(404).json({ data: "Usuario no encontrado" });
            return;
        }
        res.json({ data: rol });
    }
    catch (error) {
    }
};
exports.getRolById = getRolById;
const createRol = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre del rol no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('El rol no puede ir vacio')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const rol = await Rol_model_1.default.create(req.body);
    res.json({ data: rol });
};
exports.createRol = createRol;
const updateRol = async (req, res) => {
};
exports.updateRol = updateRol;
const deleteRol = async (req, res) => {
};
exports.deleteRol = deleteRol;
//# sourceMappingURL=rol.js.map
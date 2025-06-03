"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const Users_model_1 = __importDefault(require("../models/Users.model"));
const getUsers = async (req, res) => {
    try {
        const users = await Users_model_1.default.findAll({
            order: [
                ['user_id', 'ASC']
            ]
        });
        res.json({ data: users });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users_model_1.default.findByPk(id, {
            include: ['rol']
        });
        if (!user) {
            res.status(404).json({
                error: "Usuario no encontrado"
            });
            return;
        }
        res.json({ data: user });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre de usuario no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('La contraseña no puede ir vacia')
        .isString()
        .withMessage('Valor no valido')
        .run(req);
    await (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Email no valido')
        .notEmpty()
        .withMessage('El email no puede ir vacio')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const user = await Users_model_1.default.create(req.body);
    res.json({ data: user });
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre de usuario no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('La contraseña no puede ir vacia')
        .isString()
        .withMessage('Valor no valido')
        .run(req);
    await (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Email no valido')
        .notEmpty()
        .withMessage('El email no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('rol_id')
        .isNumeric()
        .withMessage('')
        .notEmpty()
        .withMessage('El rol no puede ir vacio')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const user = await Users_model_1.default.create(req.body);
    res.json({ data: user });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users_model_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                error: "Usuario no encontrado"
            });
            return;
        }
        await user.destroy();
        res.json({ data: "Producto eliminado" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map
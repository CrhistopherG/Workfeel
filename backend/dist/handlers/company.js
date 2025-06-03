"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.createCompany = exports.getCompanyById = exports.getCompany = void 0;
const express_validator_1 = require("express-validator");
const Company_model_1 = __importDefault(require("../models/Company.model"));
//funcion de obtener todas las compañias ya funciona
const getCompany = async (req, res) => {
    try {
        const companies = await Company_model_1.default.findAll({
            order: [
                ['company_id', 'ASC']
            ]
        });
        res.json({ data: companies });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getCompany = getCompany;
//funcion de obtener por id ya funciona
const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company_model_1.default.findByPk(id);
        console.log(company);
        if (!company) {
            res.status(404).json({ data: "Empresa no encontrado" });
            return;
        }
        res.json({ data: company });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
exports.getCompanyById = getCompanyById;
//funcion de crear ya funciona
const createCompany = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre de la compania no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('address')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('La direccion no puede ir vacia')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const company = await Company_model_1.default.create(req.body);
    res.json({ data: company });
};
exports.createCompany = createCompany;
//funcion de actualizar ya funciona
const updateCompany = async (req, res) => {
    //implementamos nuestro actualizacion de mi update 
    try {
        // Validacion
        await (0, express_validator_1.check)('name')
            .notEmpty()
            .withMessage('El nombre de la compania no puede ir vacio')
            .run(req);
        await (0, express_validator_1.check)('address')
            .isString()
            .withMessage('Valor no valido')
            .notEmpty()
            .withMessage('La direccion no puede ir vacia')
            .run(req);
        let errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const { id } = req.params;
        const company = await Company_model_1.default.findByPk(id);
        if (!company) {
            res.status(404).json({ data: "Empresa no encontrado" });
            return;
        }
        await company.update(req.body);
        res.json({ data: company });
    }
    catch (error) {
        console.log(error);
    }
    res.status(500).json({ error: "Error en el servidor" });
};
exports.updateCompany = updateCompany;
//funcion de eliminar ya funciona
const deleteCompany = async (req, res) => {
    try {
        console.log(`Petición DELETE recibida para ID: ${req.params.id}`);
        const { id } = req.params;
        const company = await Company_model_1.default.findByPk(id);
        if (!company) {
            res.status(404).json({ data: "Empresa no encontrada" });
            return;
        }
        await company.destroy();
        res.json({ data: "Empresa eliminada" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=company.js.map
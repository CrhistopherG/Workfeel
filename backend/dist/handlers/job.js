"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJobById = exports.getJobs = void 0;
const express_validator_1 = require("express-validator");
const Job_model_1 = __importDefault(require("../models/Job.model"));
const getJobs = async (req, res) => {
    try {
        const roles = await Job_model_1.default.findAll({
            order: [
                ['rol_id', 'ASC']
            ]
        });
        res.json({ data: roles });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getJobs = getJobs;
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job_model_1.default.findByPk(id);
        console.log(job);
        if (!job) {
            res.status(404).json({ data: "Usuario no encontrado" });
            return;
        }
        res.json({ data: job });
    }
    catch (error) {
    }
};
exports.getJobById = getJobById;
const createJob = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre del puesto no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('description')
        .isString()
        .withMessage('Valor no valido')
        .notEmpty()
        .withMessage('El puesto no puede ir vacio')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const job = await Job_model_1.default.create(req.body);
    res.json({ data: job });
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
};
exports.deleteJob = deleteJob;
//# sourceMappingURL=job.js.map
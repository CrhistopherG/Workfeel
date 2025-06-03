"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormularioByPeriod = void 0;
const Period_model_1 = __importDefault(require("../models/Period.model"));
const Dimension_model_1 = __importDefault(require("../models/Dimension.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const Scale_model_1 = __importDefault(require("../models/Scale.model"));
const getFormularioByPeriod = async (req, res) => {
    try {
        const { periodId } = req.params;
        const period = await Period_model_1.default.findByPk(periodId, {
            attributes: ['period_id', 'name', 'status', 'date_start', 'date_end'],
            include: [{
                    model: Dimension_model_1.default,
                    attributes: ['dimension_id', 'name', 'description', 'status'],
                    include: [{
                            model: Question_model_1.default,
                            attributes: ['question_id', 'content'],
                            include: [{
                                    model: Scale_model_1.default,
                                    attributes: ['scale_id', 'value', 'description']
                                }]
                        }]
                }]
        });
        if (!period) {
            res.status(404).json({ success: false, message: "Periodo no encontrado" });
            return;
        }
        res.json({ success: true, data: period });
    }
    catch (error) {
        console.error('Error en getFormularioByPeriod:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la estructura del formulario',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.getFormularioByPeriod = getFormularioByPeriod;
//# sourceMappingURL=formulario.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePeriod = exports.detelePeriod = exports.createPeriod = exports.getPeriods = exports.getPeriod = void 0;
const periodService = __importStar(require("../Services/periodService"));
const getPeriod = async (req, res) => {
    try {
        const { userId, periodId } = req.params;
        const period = await periodService.getPeriodById(userId, periodId);
        return res.json({
            success: true,
            data: period
        });
    }
    catch (error) {
        console.error('PeriodController.GetPeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.getPeriod = getPeriod;
const getPeriods = async (req, res) => {
    try {
        const { userId } = req.params;
        const periods = await periodService.getPeriodsByUserId(userId);
        return res.json({
            success: true,
            data: periods
        });
    }
    catch (error) {
        console.error('PeriodController.GetPeriods.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.getPeriods = getPeriods;
const createPeriod = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, date_start, date_end, company_id } = req.body;
        const newPeriod = await periodService.createPeriod(userId, { name, date_start, date_end, company_id });
        return res.status(201).json({
            success: true,
            message: 'Periodo creado correctamente',
            data: newPeriod
        });
    }
    catch (error) {
        console.error('PeriodController.CreatePeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.createPeriod = createPeriod;
const detelePeriod = async (req, res) => {
    try {
        const { userId, periodId } = req.params;
        await periodService.deletePeriod(userId, periodId);
        return res.status(200).json({
            success: true,
            message: 'Period deleted'
        });
    }
    catch (error) {
        console.error('PeriodController.DeletePeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.detelePeriod = detelePeriod;
const updatePeriod = async (req, res) => {
    try {
        const { userId, periodId } = req.params;
        const { name, date_start, date_end, company_id, status } = req.body;
        const periodUpdated = await periodService.updatePeriod(userId, periodId, { name, date_start, date_end, company_id, status });
        return res.status(200).json({
            success: true,
            message: 'Period updated',
            data: periodUpdated
        });
    }
    catch (error) {
        console.error('PeriodController.UpdatePeriod.Error: ', error);
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || 'Internal error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.updatePeriod = updatePeriod;
//# sourceMappingURL=periodController.js.map
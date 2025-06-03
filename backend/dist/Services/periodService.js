"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePeriod = exports.deletePeriod = exports.createPeriod = exports.getPeriodsByUserId = exports.getPeriodById = void 0;
const Users_model_1 = __importDefault(require("../models/Users.model"));
const Period_model_1 = __importDefault(require("../models/Period.model"));
const getPeriodById = async (userId, periodId) => {
    if (!userId) {
        throw { status: 400, message: 'User ID is required' };
    }
    ;
    const periodIdNum = parseInt(periodId, 10);
    if (isNaN(periodIdNum)) {
        throw { status: 400, message: 'periodId must be a valid number' };
    }
    const user = await Users_model_1.default.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    ;
    const period = await Period_model_1.default.findOne({
        where: {
            period_id: periodIdNum
        }
    });
    if (!period) {
        throw { status: 404, message: 'Period not found' };
    }
    return period;
};
exports.getPeriodById = getPeriodById;
const getPeriodsByUserId = async (userId) => {
    if (!userId) {
        throw { status: 400, message: 'User ID is required' };
    }
    ;
    const user = await Users_model_1.default.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    ;
    if (!user.company_id) {
        throw { status: 400, message: 'User has not a assigned company' };
    }
    ;
    const periods = await Period_model_1.default.findAll({
        where: {
            company_id: user.company_id
        },
        attributes: ['period_id', 'name', 'status', 'date_start', 'date_end'],
        order: [['date_start', 'DESC']]
    });
    return periods || [];
};
exports.getPeriodsByUserId = getPeriodsByUserId;
const createPeriod = async (userId, periodData) => {
    if (!userId) {
        throw { status: 400, message: 'User ID is required' };
    }
    ;
    const user = await Users_model_1.default.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    ;
    const { name, date_start, date_end, company_id } = periodData;
    if (!name || !date_start || !date_end) {
        throw { status: 400, message: 'Missing data: name, date_start or date_end' };
    }
    const newPeriod = await Period_model_1.default.create({
        name,
        date_start,
        date_end,
        company_id: company_id,
        status: true
    });
    return newPeriod;
};
exports.createPeriod = createPeriod;
const deletePeriod = async (userId, periodId) => {
    if (!userId || !periodId) {
        throw { status: 400, message: 'userId and periodId are required' };
    }
    const periodIdNum = parseInt(periodId, 10);
    if (isNaN(periodIdNum)) {
        throw { status: 400, message: 'periodId must be a valid number' };
    }
    const user = await Users_model_1.default.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    ;
    const period = await Period_model_1.default.findOne({
        where: {
            period_id: periodIdNum
        }
    });
    if (!period) {
        throw { status: 404, message: 'PeriodId not found' };
    }
    await period.destroy();
};
exports.deletePeriod = deletePeriod;
const updatePeriod = async (userId, periodId, data) => {
    if (!userId || !periodId) {
        throw { status: 400, message: 'userId and periodId are required' };
    }
    const periodIdNum = parseInt(periodId, 10);
    if (isNaN(periodIdNum)) {
        throw { status: 400, message: 'periodId must be a valid number' };
    }
    const user = await Users_model_1.default.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    ;
    const period = await Period_model_1.default.findOne({
        where: {
            period_id: periodIdNum
        }
    });
    if (!period) {
        throw { status: 404, message: 'PeriodId not found' };
    }
    period.update(data);
    return period;
};
exports.updatePeriod = updatePeriod;
//# sourceMappingURL=periodService.js.map
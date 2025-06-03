"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_model_1 = __importDefault(require("../models/Users.model"));
const Rol_model_1 = __importDefault(require("../models/Rol.model"));
const Company_model_1 = __importDefault(require("../models/Company.model"));
const sequelize_typescript_1 = require("sequelize-typescript");
const Department_model_1 = __importDefault(require("../models/Department.model"));
const Dimension_model_1 = __importDefault(require("../models/Dimension.model"));
const Evaluation_model_1 = __importDefault(require("../models/Evaluation.model"));
const Job_model_1 = __importDefault(require("../models/Job.model"));
const Period_model_1 = __importDefault(require("../models/Period.model"));
const Scale_model_1 = __importDefault(require("../models/Scale.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    models: [Users_model_1.default, Rol_model_1.default, Company_model_1.default, Department_model_1.default, Dimension_model_1.default, Evaluation_model_1.default, Job_model_1.default, Period_model_1.default, Scale_model_1.default, Question_model_1.default],
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});
exports.default = db;
//# sourceMappingURL=db.js.map
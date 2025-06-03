"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Company_model_1 = __importDefault(require("./Company.model"));
const Period_model_1 = __importDefault(require("./Period.model"));
const Dimension_model_1 = __importDefault(require("./Dimension.model"));
const Question_model_1 = __importDefault(require("./Question.model"));
const Scale_model_1 = __importDefault(require("./Scale.model"));
let Evaluation = class Evaluation extends sequelize_typescript_1.Model {
    evaluation_id;
    // Foreign key to company
    company_id;
    company;
    //Foreign key to period
    period_id;
    period;
    //Foreign key to dimension
    dimension_id;
    dimension;
    //Foreign key to question
    question_id;
    question;
    //Foreign key to scale
    scale_id;
    scale;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "evaluation_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Company_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "company_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Company_model_1.default),
    __metadata("design:type", Company_model_1.default
    //Foreign key to period
    )
], Evaluation.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Period_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "period_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Period_model_1.default),
    __metadata("design:type", Period_model_1.default
    //Foreign key to dimension
    )
], Evaluation.prototype, "period", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Dimension_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "dimension_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Dimension_model_1.default),
    __metadata("design:type", Dimension_model_1.default
    //Foreign key to question
    )
], Evaluation.prototype, "dimension", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Question_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "question_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Question_model_1.default),
    __metadata("design:type", Question_model_1.default
    //Foreign key to scale
    )
], Evaluation.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Scale_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "scale_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Scale_model_1.default),
    __metadata("design:type", Scale_model_1.default)
], Evaluation.prototype, "scale", void 0);
Evaluation = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'evaluation',
        timestamps: false
    })
], Evaluation);
exports.default = Evaluation;
//# sourceMappingURL=Evaluation.model.js.map
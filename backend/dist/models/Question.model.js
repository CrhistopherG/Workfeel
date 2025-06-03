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
const Dimension_model_1 = __importDefault(require("./Dimension.model"));
const Scale_model_1 = __importDefault(require("./Scale.model"));
let Question = class Question extends sequelize_typescript_1.Model {
    question_id;
    content;
    dimension_id;
    dimension;
    escalas;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Question.prototype, "question_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false
    }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Dimension_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Question.prototype, "dimension_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Dimension_model_1.default),
    __metadata("design:type", Dimension_model_1.default)
], Question.prototype, "dimension", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Scale_model_1.default),
    __metadata("design:type", Array)
], Question.prototype, "escalas", void 0);
Question = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'question',
        timestamps: false
    })
], Question);
exports.default = Question;
//# sourceMappingURL=Question.model.js.map
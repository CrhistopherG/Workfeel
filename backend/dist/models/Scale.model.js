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
const Question_model_1 = __importDefault(require("./Question.model"));
const sequelize_typescript_2 = require("sequelize-typescript");
let Scale = class Scale extends sequelize_typescript_1.Model {
    scale_id;
    question_id; // <-- Nuevo campo
    value;
    description;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Scale.prototype, "scale_id", void 0);
__decorate([
    (0, sequelize_typescript_2.ForeignKey)(() => Question_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Scale.prototype, "question_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        validate: {
            min: 1, // Minimum value
            max: 5, // Maximum value
            isInt: true, // Ensure it's an integer
        },
    }),
    __metadata("design:type", Number)
], Scale.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true
    }),
    __metadata("design:type", String)
], Scale.prototype, "description", void 0);
Scale = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'scale',
        timestamps: false
    })
], Scale);
exports.default = Scale;
//# sourceMappingURL=Scale.model.js.map
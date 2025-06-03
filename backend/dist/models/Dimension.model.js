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
const Period_model_1 = __importDefault(require("./Period.model"));
const Question_model_1 = __importDefault(require("./Question.model"));
let Dimension = class Dimension extends sequelize_typescript_1.Model {
    dimension_id;
    name;
    description;
    status;
    period_id;
    period;
    preguntas;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'dimension_id' // <-- asegúrate de esto
    }),
    __metadata("design:type", Number)
], Dimension.prototype, "dimension_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    __metadata("design:type", String)
], Dimension.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true
    }),
    __metadata("design:type", String)
], Dimension.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN
    }),
    __metadata("design:type", Boolean)
], Dimension.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Period_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Dimension.prototype, "period_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Period_model_1.default),
    __metadata("design:type", Period_model_1.default)
], Dimension.prototype, "period", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Question_model_1.default),
    __metadata("design:type", Array)
], Dimension.prototype, "preguntas", void 0);
Dimension = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'dimension',
        timestamps: false
    })
], Dimension);
exports.default = Dimension;
//# sourceMappingURL=Dimension.model.js.map
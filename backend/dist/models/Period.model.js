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
const Dimension_model_1 = __importDefault(require("./Dimension.model"));
let Period = class Period extends sequelize_typescript_1.Model {
    period_id;
    name;
    status;
    date_start;
    date_end;
    company_id;
    company;
    dimensiones;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Period.prototype, "period_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    __metadata("design:type", String)
], Period.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN
    }),
    __metadata("design:type", Boolean)
], Period.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY
    }),
    __metadata("design:type", String)
], Period.prototype, "date_start", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY
    }),
    __metadata("design:type", String)
], Period.prototype, "date_end", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Company_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Period.prototype, "company_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Company_model_1.default),
    __metadata("design:type", Company_model_1.default)
], Period.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Dimension_model_1.default),
    __metadata("design:type", Array)
], Period.prototype, "dimensiones", void 0);
Period = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'period',
        timestamps: false
    })
], Period);
exports.default = Period;
//# sourceMappingURL=Period.model.js.map
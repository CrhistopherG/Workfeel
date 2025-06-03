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
const Rol_model_1 = __importDefault(require("./Rol.model"));
const Company_model_1 = __importDefault(require("./Company.model"));
let User = class User extends sequelize_typescript_1.Model {
    user_id;
    name;
    password; // El ! indica que siempre estará presente
    email;
    // Llave foránea hacia Rol
    rol_id;
    rol;
    // Llave foránea hacia Company
    company_id;
    company;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false // Asegúrate que no sea null
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Rol_model_1.default),
    (0, sequelize_typescript_1.Default)(2) // Rol por defecto: 2 (ej. Administrador)
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "rol_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Rol_model_1.default),
    __metadata("design:type", Rol_model_1.default)
], User.prototype, "rol", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Company_model_1.default),
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "company_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Company_model_1.default),
    __metadata("design:type", Company_model_1.default)
], User.prototype, "company", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        timestamps: false, // Evita createdAt y updatedAt
    })
], User);
exports.default = User;
//# sourceMappingURL=Users.model.js.map
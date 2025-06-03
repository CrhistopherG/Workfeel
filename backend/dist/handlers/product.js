"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const express_validator_1 = require("express-validator");
const Product_model_1 = __importDefault(require("../models/Product.model"));
const createProduct = async (req, res) => {
    // Validacion
    await (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('El nombre de producto no puede ir vacio')
        .run(req);
    await (0, express_validator_1.check)('price')
        .notEmpty()
        .withMessage('El precio de producto no puede ir vacio')
        .isNumeric()
        .withMessage('Valor no valido')
        .custom(value => value > 0)
        .withMessage('Precio no valido')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const product = await Product_model_1.default.create(req.body);
    res.json({ data: product });
};
exports.createProduct = createProduct;
//# sourceMappingURL=product.js.map
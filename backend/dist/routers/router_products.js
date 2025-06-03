"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../handlers/product");
const router = (0, express_1.Router)();
//routing
router.get('/', (req, res) => {
    res.json('desde get');
});
router.post('/', product_1.createProduct);
router.put('/', (req, res) => {
    res.json('desde put');
});
router.patch('/', (req, res) => {
    res.json('desde patch');
});
router.delete('/', (req, res) => {
    res.json('desde delete');
});
exports.default = router;
//# sourceMappingURL=router_products.js.map
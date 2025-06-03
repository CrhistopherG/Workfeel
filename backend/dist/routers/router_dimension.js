"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dimension_1 = require("../handlers/dimension");
const router_dimension = (0, express_1.Router)();
//routing
router_dimension.get('/', dimension_1.getDimensions);
router_dimension.get("/activas", dimension_1.getActiveDimensions);
router_dimension.get("/:id", dimension_1.getDimensionById);
router_dimension.post('/', dimension_1.createDimension);
router_dimension.patch('/:id', dimension_1.updateDimension);
router_dimension.put('/:id', dimension_1.updateDimension);
router_dimension.delete('/:id', dimension_1.deleteDimension);
exports.default = router_dimension;
//# sourceMappingURL=router_dimension.js.map
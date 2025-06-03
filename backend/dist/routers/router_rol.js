"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../handlers/rol");
const router_rol = (0, express_1.Router)();
//routing
router_rol.get('/', rol_1.getRoles);
router_rol.get('/:id', rol_1.getRolById);
router_rol.post('/', rol_1.createRol);
router_rol.patch('/:id', rol_1.updateRol);
router_rol.delete('/:id', rol_1.deleteRol);
exports.default = router_rol;
//# sourceMappingURL=router_rol.js.map
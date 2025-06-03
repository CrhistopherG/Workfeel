"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formulario_1 = require("../handlers/formulario"); // <--- nombre correcto
const router_formulario = (0, express_1.Router)();
// Routing
router_formulario.get("/:periodId", formulario_1.getFormularioByPeriod);
exports.default = router_formulario;
//# sourceMappingURL=router_formulario.js.map
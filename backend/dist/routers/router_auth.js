"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router_auth = (0, express_1.Router)();
// Endpoint para registrar un nuevo usuario
router_auth.post('/register', authController_1.register);
// Endpoint para iniciar sesión
router_auth.post('/login', authController_1.login);
exports.default = router_auth;
//# sourceMappingURL=router_auth.js.map
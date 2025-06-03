"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routers/router_job.ts
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const router_job = (0, express_1.Router)();
// GET y POST de lista de puestos por usuario
router_job.get('/users/:userId/listapuestos', jobController_1.getPuestosByUser);
router_job.post('/users/:userId/listapuestos', jobController_1.createPuesto);
exports.default = router_job;
//# sourceMappingURL=router_job.js.map
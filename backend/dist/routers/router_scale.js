"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scale_1 = require("../handlers/scale");
const router_scale = (0, express_1.Router)();
//routing de las scales 
router_scale.get("/", scale_1.getScales);
router_scale.get("/:id", scale_1.getScaleById);
router_scale.get("/:question_id", scale_1.getScalesByQuestion);
router_scale.post("/", scale_1.createScale);
router_scale.put("/:id", scale_1.updateScale);
router_scale.patch("/:id", scale_1.updateScale);
router_scale.delete("/:id", scale_1.deleteScale);
exports.default = router_scale;
//# sourceMappingURL=router_scale.js.map
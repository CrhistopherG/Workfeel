"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deparment_1 = require("../handlers/deparment");
const router_department = (0, express_1.Router)();
//routing
router_department.get('/', deparment_1.getDepartments);
router_department.get('/:id', deparment_1.getDepartmentById);
router_department.post('/', deparment_1.createDepartment);
router_department.patch('/:id', deparment_1.updateDepartment);
router_department.delete('/:id', deparment_1.deleteDepartment);
exports.default = router_department;
//# sourceMappingURL=router_department.js.map
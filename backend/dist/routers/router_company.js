"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../handlers/company");
const router_company = (0, express_1.Router)();
//routing
router_company.get('/', company_1.getCompany);
router_company.get('/:id', company_1.getCompanyById);
router_company.post('/', company_1.createCompany);
router_company.patch('/:id', company_1.updateCompany);
router_company.delete('/:id', company_1.deleteCompany);
exports.default = router_company;
//# sourceMappingURL=router_company.js.map
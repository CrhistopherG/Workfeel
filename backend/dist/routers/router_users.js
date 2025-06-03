"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../handlers/user");
const periodController = __importStar(require("../controllers/periodController"));
const router_users = (0, express_1.Router)();
// Usuarios
router_users.get('/', user_1.getUsers);
router_users.get('/:id', user_1.getUserById);
router_users.post('/', user_1.createUser);
router_users.patch('/:id', user_1.updateUser);
router_users.delete('/:id', user_1.deleteUser);
// Periodos por usuario
router_users.get('/:userId/periods', periodController.getPeriods);
router_users.get('/:userId/periods/:periodId', periodController.getPeriod);
router_users.post('/:userId/newPeriod', periodController.createPeriod);
router_users.delete('/:userId/periods/:periodId', periodController.detelePeriod);
router_users.put('/:userId/periods/:periodId', periodController.updatePeriod);
exports.default = router_users;
//# sourceMappingURL=router_users.js.map
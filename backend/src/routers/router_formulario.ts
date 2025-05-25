import { Router } from "express";
import { getFormularioByPeriod } from "../handlers/formulario"; // <--- nombre correcto

const router_formulario: Router = Router();

// Routing
router_formulario.get("/:periodId", getFormularioByPeriod);

export default router_formulario;
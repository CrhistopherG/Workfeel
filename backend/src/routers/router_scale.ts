import { Router } from "express";
import {
    getScales,
    getScalesByQuestion,
    createScale,
    updateScale,
    deleteScale,
    getScaleById,
} from "../handlers/scale";

const router_scale: Router = Router();

//routing de las scales 
router_scale.get("/", getScales);
router_scale.get("/:id", getScaleById);
router_scale.get("/:question_id", getScalesByQuestion);
router_scale.post("/", createScale);
router_scale.put("/:id", updateScale);
router_scale.patch("/:id", updateScale);
router_scale.delete("/:id", deleteScale);

export default router_scale;
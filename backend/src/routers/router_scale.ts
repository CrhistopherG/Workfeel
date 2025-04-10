import { Router } from "express";
import { getScale ,getScaleById, createScale,updateScale,deletescale} from "../handlers/Scale";

const router_scale = Router();

router_scale.get("/", getScale);
router_scale.get('/:id', getScaleById)
router_scale.post('/', createScale)
router_scale.patch('/:id', updateScale)
router_scale.delete('/:id',deletescale)

export default router_scale;
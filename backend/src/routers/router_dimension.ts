import {Router} from 'express';
import {createDimension, deleteDimension, getDimensions, getDimensionById, updateDimension,getActiveDimensions} from '../handlers/dimension'

const router_dimension: Router = Router()
//routing
router_dimension.get('/', getDimensions)
router_dimension.get("/activas", getActiveDimensions);
router_dimension.get("/:id", getDimensionById);
router_dimension.post('/', createDimension)
router_dimension.patch('/:id', updateDimension)
router_dimension.put('/:id', updateDimension)
router_dimension.delete('/:id', deleteDimension)

export default router_dimension
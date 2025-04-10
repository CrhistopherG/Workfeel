import {Router} from 'express';
import {createDimension, getDimensions, getDimensionById, updateDimension, deleteDimension} from '../handlers/dimension'


//routing 
const router_dimension: Router = Router()

router_dimension.get('/', getDimensions)
router_dimension.get('/:id', getDimensionById)
router_dimension.post('/', createDimension)
router_dimension.patch('/id:', updateDimension)
router_dimension.delete('/:id' , deleteDimension)

export default router_dimension
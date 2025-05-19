import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../handlers/user';

import { createPeriod, getPeriods } from '../handlers/period';
import * as periodController from '../controllers/periodController';

const router_users: Router = Router();

// Usuarios
router_users.get('/', getUsers);
router_users.get('/:id', getUserById);
router_users.post('/', createUser);
router_users.patch('/:id', updateUser);
router_users.delete('/:id', deleteUser);

// Periodos por usuario
router_users.get('/:userId/periods', periodController.getPeriods); 
router_users.get('/:userId/periods/:periodId', periodController.getPeriod);
router_users.post('/:userId/newPeriod', periodController.createPeriod);
router_users.delete('/:userId/periods/:periodId', periodController.detelePeriod);
router_users.put('/:userId/periods/:periodId', periodController.updatePeriod);
export default router_users;

import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../handlers/user';

import { createPeriod, getPeriods } from '../handlers/period';

const router_users: Router = Router();

// Usuarios
router_users.get('/', getUsers);
router_users.get('/:id', getUserById);
router_users.post('/', createUser);
router_users.patch('/:id', updateUser);
router_users.delete('/:id', deleteUser);

// Periodos por usuario
router_users.get('/:userId/periods', getPeriods); // 👈 Esta es la nueva ruta que necesitas
router_users.post('/:userId/newPeriod', createPeriod);
export default router_users;

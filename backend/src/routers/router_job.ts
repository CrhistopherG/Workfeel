// routers/router_job.ts
import { Router } from 'express';
import { getPuestosByUser, createPuesto } from '../controllers/jobController';

const router_job = Router();

// GET y POST de lista de puestos por usuario
router_job.get('/users/:userId/listapuestos', getPuestosByUser);
router_job.post('/users/:userId/listapuestos', createPuesto);

export default router_job;

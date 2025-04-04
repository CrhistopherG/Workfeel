import { Router } from 'express';
import { login, register } from '../controllers/authController';



const router_auth = Router();

// Endpoint para registrar un nuevo usuario
router_auth.post('/register', register)

// Endpoint para iniciar sesión
router_auth.post('/login', login);

export default router_auth;

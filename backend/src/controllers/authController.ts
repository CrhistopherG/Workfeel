import { Request, Response } from 'express';
import User from '../models/Users.model';


export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email } = req.body;

  // Log 1: Verificar datos recibidos del frontend
  console.log('[REGISTER] Datos recibidos:', {
    name,
    email,
    password: password ? '*** (existe)' : 'undefined (no recibida)'
  });

  try {
    // Log 2: Antes de buscar usuario existente
    console.log('[REGISTER] Buscando usuario existente con email:', email);
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('[REGISTER] Error: Correo ya en uso');
      res.status(400).json({ message: 'El correo ya está en uso' });
      return 
    }

    // Log 3: Antes de crear el usuario
    console.log('[REGISTER] Creando usuario con contraseña:', password ? '***' : 'undefined');
    
    const newUser = await User.create({ name, password, email });
    
    // Log 4: Después de crear el usuario (verificar DB)
    console.log('[REGISTER] Usuario creado en DB:', {
      id: newUser.user_id,
      name: newUser.name,
      email: newUser.email,
      passwordInDB: newUser.password ? '*** (guardada)' : 'undefined (error)'
    });

    res.status(201).json({ 
      success: true,
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser.user_id,
        name: newUser.name,
        email: newUser.email
      }
    });
    
  } catch (error) {
    console.error('[REGISTER] Error crítico:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al registrar usuario' 
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Log 1: Verificar datos de login recibidos
  console.log('[LOGIN] Datos recibidos:', {
    email,
    password: password ? '*** (existe)' : 'undefined (no recibida)'
  });

  try {
    // Log 2: Antes de buscar al usuario
    console.log('[LOGIN] Buscando usuario con email:', email);
    
    const user = await User.findOne({ 
      where: { email },
      attributes: ['user_id', 'name', 'password', 'email', 'rol_id', 'company_id'],
      raw: true
    });

    // Log 3: Resultado de la consulta
    console.log('[LOGIN] Usuario recuperado de DB:', {
      user_id: user?.user_id,
      email: user?.email,
      passwordInDB: user?.password ? '*** (existe)' : 'undefined (error)',
      rol_id: user?.rol_id,
      company_id: user?.company_id
    });

    if (!user) {
      console.log('[LOGIN] Error: Usuario no encontrado');
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return 
    }

    if (!user.password) {
      console.error('[LOGIN] Error crítico: Contraseña es undefined en DB');
      res.status(500).json({ 
        success: false, 
        message: 'Error: contraseña no recuperada' 
      });
      return 
    }

    // Log 4: Comparación de contraseñas (solo en desarrollo)
    console.log('[LOGIN] Comparando contraseñas:',
      `Recibida: ${password}`,
      `En DB: ${user.password}`,
      `Coinciden: ${password === user.password}`
    );

    if (password !== user.password) {
      console.log('[LOGIN] Error: Contraseña incorrecta');
      res.status(401).json({ 
        success: false,
        message: 'Contraseña incorrecta' 
      });
      return 
    }

    console.log('[LOGIN] Éxito: Credenciales válidas');
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        rol_id: user.rol_id,
        company_id: user.company_id
      }
    });
    
  } catch (error) {
    console.error('[LOGIN] Error crítico:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor' 
    });
  }
};
import express from "express";
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import router_products from "./routers/router_products";
import router_users from "./routers/router_users";
import router_roles from "./routers/router_rol";
import router_company from "./routers/router_company";
import db from "./config/db";
import router_department from "./routers/router_department";
import router_auth from "./routers/router_auth";
// Conectar a la base de datos
async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgBlue.bold('Conexion exitosa a la base de datos'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'));
    }
}

connectDB();

// Instancia de express
const server = express();

// Opciones de CORS
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://127.0.0.1:5173'
      ];
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true, // This is crucial for authentication
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  server.use(cors(corsOptions));
  server.options('*', cors(corsOptions)); // Preflight

server.use(express.json());

// Mandar routers
server.use('/api/products', router_products);
server.use('/api/users', router_users);
server.use('/api/roles', router_roles);
server.use('/api/company', router_company);
server.use('/api/department', router_department);
server.use('/api', router_auth);

server.use('*', (req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
});


export default server;
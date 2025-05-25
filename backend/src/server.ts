import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import router_products from "./routers/router_products";
import router_users from "./routers/router_users";
import router_roles from "./routers/router_rol";
import router_company from "./routers/router_company";
import router_dimension from "./routers/router_dimension";
import db from "./config/db";
import router_department from "./routers/router_department";
import router_auth from "./routers/router_auth";
import router_question from "./routers/router_questions";
import router_scale from "./routers/router_scale";

import router_formulario from "./routers/router_formulario";
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

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://workfeel.netlify.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Permite requests sin origen (Postman, apps móviles, etc)
      console.log("CORS: Request sin origin permitido");
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      console.log("CORS: Origin permitido:", origin);
      return callback(null, true);
    } else {
      console.log("CORS: Origin bloqueado:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // importante para cookies y autenticación
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));
server.options("*", cors(corsOptions)); // Para preflight

server.use(express.json());


// Mandar routers
server.use('/api/products', router_products);
server.use('/api/users', router_users);
server.use('/api/roles', router_roles);
server.use('/api/company', router_company);
server.use('/api/department', router_department);
server.use('/api', router_auth);
server.use('/api/dimension', router_dimension)
server.use('/api/question', router_question)  
server.use('/api/scale', router_scale)
server.use('/api/formulario', router_formulario)



// Ruta para manejar rutas no encontradas
server.use("*", (req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
});

export default server;

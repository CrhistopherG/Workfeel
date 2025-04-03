import express  from "express";
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import router_products from "./routers/router_products";
import router_users from "./routers/router_users";
import router_roles from "./routers/router_rol";
import router_company from "./routers/router_company";
import db from "./config/db";
import router_department from "./routers/router_department";


// Conectar a base de datos
async function connectDB(){
    try {

        await db.authenticate()
        db.sync()
        console.log(colors.bgBlue.bold('Conexion exitosa a la base de datos'));
        
    } catch (error) {

        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la base de dato'));
        
    }
}

connectDB()

//Instancia de express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL || "http://localhost:5173", // Permitir el frontend
            "http://localhost:4000" // Permitir peticiones desde el backend mismo (útil si el frontend está en el mismo servidor)
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS bloqueado"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"], // Permitir estos métodos
    allowedHeaders: ["Content-Type", "Authorization"], // Permitir estos headers
    credentials: true, // Permitir envío de cookies si es necesario
};

server.use(cors(corsOptions));


//Leer datos de formularios
server.use(express.json())


// Mandar router
server.use('/api/products', router_products)
server.use('/api/users', router_users)
server.use('/api/roles', router_roles)
server.use('/api/company', router_company)
server.use('/api/department', router_department)


export default server
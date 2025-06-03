"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const router_products_1 = __importDefault(require("./routers/router_products"));
const router_users_1 = __importDefault(require("./routers/router_users"));
const router_rol_1 = __importDefault(require("./routers/router_rol"));
const router_company_1 = __importDefault(require("./routers/router_company"));
const router_dimension_1 = __importDefault(require("./routers/router_dimension"));
const db_1 = __importDefault(require("./config/db"));
const router_department_1 = __importDefault(require("./routers/router_department"));
const router_auth_1 = __importDefault(require("./routers/router_auth"));
const router_questions_1 = __importDefault(require("./routers/router_questions"));
const router_scale_1 = __importDefault(require("./routers/router_scale"));
const router_formulario_1 = __importDefault(require("./routers/router_formulario"));
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        console.log(colors_1.default.bgBlue.bold('Conexion exitosa a la base de datos'));
    }
    catch (error) {
        console.log(error);
        console.log(colors_1.default.red.bold('Hubo un error al conectar a la base de datos'));
    }
}
connectDB();
// Instancia de express
const server = (0, express_1.default)();
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://workfeel.netlify.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            // Permite requests sin origen (Postman, apps móviles, etc)
            console.log("CORS: Request sin origin permitido");
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            console.log("CORS: Origin permitido:", origin);
            return callback(null, true);
        }
        else {
            console.log("CORS: Origin bloqueado:", origin);
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // importante para cookies y autenticación
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
server.use((0, cors_1.default)(corsOptions));
server.options("*", (0, cors_1.default)(corsOptions)); // Para preflight
server.use(express_1.default.json());
// Mandar routers
server.use('/api/products', router_products_1.default);
server.use('/api/users', router_users_1.default);
server.use('/api/roles', router_rol_1.default);
server.use('/api/company', router_company_1.default);
server.use('/api/department', router_department_1.default);
server.use('/api', router_auth_1.default);
server.use('/api/dimension', router_dimension_1.default);
server.use('/api/question', router_questions_1.default);
server.use('/api/scale', router_scale_1.default);
server.use('/api/formulario', router_formulario_1.default);
// Ruta para manejar rutas no encontradas
server.use("*", (req, res) => {
    res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
});
exports.default = server;
//# sourceMappingURL=server.js.map
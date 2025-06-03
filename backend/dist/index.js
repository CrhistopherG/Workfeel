"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./config/db")); // <-- importa tu conexión Sequelize
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 4010;
async function startServer() {
    try {
        await db_1.default.authenticate();
        console.log(colors_1.default.green.bold('🟢 Conexión a PostgreSQL exitosa'));
        // Opcional: sincronizar modelos con la base de datos
        // await db.sync();
        server_1.default.listen(port, () => {
            console.log(colors_1.default.cyan.bold(`🚀 REST API en el puerto ${port}`));
        });
    }
    catch (error) {
        console.error(colors_1.default.red.bold('🔴 Error al conectar a la base de datos:'));
        console.error(error);
        process.exit(1); // salir si no se puede conectar
    }
}
startServer();
//# sourceMappingURL=index.js.map
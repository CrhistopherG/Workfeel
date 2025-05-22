import colors from 'colors';
import server from './server';
import db from './config/db'; // <-- importa tu conexión Sequelize
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4010;

async function startServer() {
  try {
    await db.authenticate();
    console.log(colors.green.bold('🟢 Conexión a PostgreSQL exitosa'));

    // Opcional: sincronizar modelos con la base de datos
    // await db.sync();

    server.listen(port, () => {
      console.log(colors.cyan.bold(`🚀 REST API en el puerto ${port}`));
    });

  } catch (error) {
    console.error(colors.red.bold('🔴 Error al conectar a la base de datos:'));
    console.error(error);
    process.exit(1); // salir si no se puede conectar
  }
}

startServer();

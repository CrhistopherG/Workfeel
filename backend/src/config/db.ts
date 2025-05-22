import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + '/../models/**/*.ts'],
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // importante para Render
    }
  },
  logging: false
});

export default db;

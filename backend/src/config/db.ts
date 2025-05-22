import Users from '../models/Users.model';
import Rol from '../models/Rol.model';
import Company from '../models/Company.model';
import { Sequelize } from 'sequelize-typescript';
import Department from '../models/Department.model';
import Dimension from '../models/Dimension.model';
import Evaluation from '../models/Evaluation.model';
import Job from '../models/Job.model';
import Period from '../models/Period.model';
import Scale from '../models/Scale.model';
import Question from '../models/Question.model';
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Users, Rol, Company, Department, Dimension, Evaluation, Job, Period, Scale, Question],
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

export default db

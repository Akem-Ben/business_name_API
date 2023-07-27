import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

import {
  DATABASE_HOST,
DATABASE_USERNAME,
DATABASE_PASSWORD,
DATABASE_NAME,
DB_SCHEMA_NAME,
DB_NAME,
DB_PASSWORD
} from './config';

dotenv.config()


const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  dialect: "mysql",
  host: DATABASE_HOST,
  // port: 3306,
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
});
// const sequelize = new Sequelize(DB_SCHEMA_NAME, DB_NAME, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql',
// });

export default sequelize
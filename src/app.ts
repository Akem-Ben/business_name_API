import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import companyRoutes from './routes/companyRoute';
import db from './config/database';
import { connect } from '@planetscale/database';
import mysql2 from 'mysql2';


dotenv.config()

const app = express();


const connection = mysql2.createConnection(`${process.env.DATABASE_URL}`)
console.log('Connected to PlanetScale!')
connection.end()


app.use(express.json())
app.use(cors())
app.use(logger("dev"))
app.use(cookieParser())
app.use('/company', companyRoutes)

// async function startApp() {
//   try {
//     await db.sync({});
//     console.log('Database synchronized');
//   } catch (error) {
//     console.error('Error synchronizing database:', error);
//   }
// }

// startApp();

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App listening on Port ${process.env.PORT || 3000}`)
})
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import companyRoutes from './routes/companyRoute';
import mysql2 from 'mysql2';


dotenv.config()

const app = express();


const connection = mysql2.createConnection(`mysql://qdxe5jd2nihxlij6ge7r:pscale_pw_CdgxJH67pDJBLp2E1KIYpOE2i8i2zxR4SZtaqZZ6RIi@aws.connect.psdb.cloud/verification?ssl={"rejectUnauthorized":true}`)
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
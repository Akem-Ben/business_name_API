import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import companyRoutes from './routes/companyRoute';
import sequelize from './config/database';


dotenv.config()

const app = express();


const syncDatabase = async () => {
    try {
     await sequelize.authenticate();
     console.log('Connected to the database.');
     await sequelize.sync({ force: false }).then(() => {
         console.log('Database synced successfully');
       });
  
    } catch (error) {
     console.error('Unable to connect to the database:', error);
    } 
  }
  syncDatabase()


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
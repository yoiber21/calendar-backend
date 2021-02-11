/* se importa express, json y morgan */
import express from 'express';
import {json} from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
/* se importan las rutas */
import authRoutes from './routes/auth-route';
import dbConnection from './database/config';
const app = express()



// Base de datos
dbConnection();

/* middlewares */
app.use(morgan('dev'))//para ver las peticiones que llegan al servidor
app.use(json())// para procesar datos en formato json
app.use(cors());

//Rutas
app.use('/api/auth', authRoutes)


// Lectura y parseo del body
  

//Directorio publico

app.use(express.static('public'))


export default app


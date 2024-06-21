// archivo para configurar todo el codigo de express
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import AuthRoutes from './routes/auth.routes.js';
import TaskRoutes from './routes/tasks.routes.js';

const app = express();

app.use(cors({ 
    origin: 'http://localhost:5173', //// permite que solo este dominio se pueda comunicar con este servidor
    credentials: true   // para establecer las cookies 
})); 
app.use(morgan('dev'));
app.use(express.json()); // para convertir los body en json o en un objeto js
app.use(cookieParser()); // convierte en un objeto json el cookie

app.use('/api', AuthRoutes); // Todas las rutas de AuthRoutes iniciaran con /api
app.use('/api', TaskRoutes)

export default app;

// npm i nodemon -D
// npm i cookie-parser
// npm i zod
// npm i cors  : para manejar la politica de seguridad de los navegadores, no se pueden comunicar 2 dominios diferentes
// el front esta en http://localhost:5173 y el back en http://localhost:4000

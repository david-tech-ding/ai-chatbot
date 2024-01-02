import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
//middleware to tell app that we're using JSON for incoming and outcoming request, parses to JSON
app.use(express.json());
//middleware for cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove in production
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;

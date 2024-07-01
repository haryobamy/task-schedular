require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import { ErrorHandlerWare } from './middleware/error';
import taskRoutes from './routes/task.routes';
import logsRouter from './routes/logs.routes';

//body parser
app.use(express.json({ limit: '50mb' }));

//cors
app.use(
  cors({
    origin: ['http://localhost:5173', '*'],
    credentials: true,
  })
);

app.use('/api/v1', taskRoutes);
app.use('/api/v1', logsRouter);

//testing app route

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'Api is working fine',
  });
});

//unknow route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorHandlerWare);

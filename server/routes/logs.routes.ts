import express from 'express';
import { createLog, getLogs } from '../controllers/logs.controller';

const logsRouter = express.Router();

logsRouter.post('/logs', createLog);

logsRouter.get('/logs', getLogs);

export default logsRouter;

import { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsynError';
import { LogModel } from '../models/logs.model';
import ErrorHandler from '../utils/ErrorHandler';

export const createLog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, executedAt } = req.body;
      const log = new LogModel({ taskId, executedAt });
      await log.save();
      res.status(201).send(log);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getLogs = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logs = await LogModel.find();
      res.status(200).send(logs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

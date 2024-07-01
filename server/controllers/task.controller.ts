import { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsynError';
import ErrorHandler from '../utils/ErrorHandler';
import TaskModel, { ITask } from '../models/task.model';
import { scheduleTask } from '../services/schedular.service';

export const createTask = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, type, time, cron } = req.body;
      const task = new TaskModel({ name, type, time, cron });
      await task.save();
      scheduleTask(task);
      res.status(201).json(task);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updateTaskById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, type, time, cron } = req.body;
      const task = await TaskModel.findByIdAndUpdate(
        id,
        { name, type, time, cron },
        { new: true }
      );
      scheduleTask(task as ITask);
      res.status(200).json(task);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const deleteTask = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await TaskModel.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getTasks = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await TaskModel.find();
      console.log(tasks);
      res.status(200).json(tasks);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

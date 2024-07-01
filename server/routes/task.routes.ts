import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskById,
} from '../controllers/task.controller';

const taskRouter = express.Router();

taskRouter.post('/task', createTask);

taskRouter.put('/task/:id', updateTaskById);

taskRouter.delete('/task/:id', deleteTask);

taskRouter.get('/tasks', getTasks);

export default taskRouter;

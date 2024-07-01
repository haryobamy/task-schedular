import cron from 'node-cron';
import TaskModel, { ITask } from '../models/task.model';
import axios from 'axios';
// import redis from 'redis';
// import Task, { ITask } from '../models/task';

// const client = redis.createClient();

// client.on('error', (err) => {
//   console.error('Redis error:', err);
// });

const scheduleTask = async (task: ITask) => {
  if (task.type === 'one-time') {
    const delay = task.time.getTime() - Date.now();
    setTimeout(() => executeTask(task), delay);
  } else if (task.type === 'recurring') {
    cron.schedule(task.cron, () => executeTask(task));
  }
};

const executeTask = async (task: ITask) => {
  console.log(`Executing task: ${task.name}`);
  task.executed = true;
  await task.save();
  await axios.post('http://localhost:8000/api/v1/logs', {
    taskId: task._id,
    executedAt: new Date(),
  });
};

const initializeScheduler = async () => {
  const tasks = await TaskModel.find({ executed: false });
  tasks.forEach(scheduleTask);
};

export { scheduleTask, initializeScheduler };

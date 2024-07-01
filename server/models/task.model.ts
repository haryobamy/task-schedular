import mongoose, { Schema, model, Document, Model } from 'mongoose';

export interface ITask extends Document {
  name: string;
  type: 'one-time' | 'recurring';
  time: Date;
  cron: string;
  executed: boolean;
  executedAt: Date;
}

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: Date },
  cron: { type: String },
  executed: { type: Boolean, default: false },
  executedAt: { type: Date },
});

const TaskModel: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default TaskModel;

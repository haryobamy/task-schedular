import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  taskId: mongoose.Types.ObjectId;
  executedAt: Date;
}

const LogSchema: Schema = new Schema({
  taskId: { type: mongoose.Types.ObjectId, required: true },
  executedAt: { type: Date, required: true },
});

export const LogModel = mongoose.model<ILog>('Log', LogSchema);

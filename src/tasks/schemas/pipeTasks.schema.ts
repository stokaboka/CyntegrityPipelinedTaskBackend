import * as mongoose from 'mongoose';

export const PipeTasksSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    pipeId: Number,
    taskId: Number,
});

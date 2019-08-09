/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import * as mongoose from 'mongoose';

export const PipelineTasksSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    pipelineId: Number,
    taskId: Number,
});

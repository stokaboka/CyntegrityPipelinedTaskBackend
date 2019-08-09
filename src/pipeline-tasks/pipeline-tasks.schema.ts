/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import * as mongoose from 'mongoose';

export const PipelineTasksSchema = new mongoose.Schema({
  id: Number,
  userId: String,
  pipelineId: String,
  taskId: String,
  user: Object,
  pipeline: Object,
  task: Object,
});

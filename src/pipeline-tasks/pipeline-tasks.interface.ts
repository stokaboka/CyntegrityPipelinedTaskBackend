/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface PipelineTasks extends Document {
  readonly userId: string;
  readonly pipelineId: string;
  readonly taskId: string;
  readonly user: object;
  readonly pipeline: object;
  readonly task: object;
}

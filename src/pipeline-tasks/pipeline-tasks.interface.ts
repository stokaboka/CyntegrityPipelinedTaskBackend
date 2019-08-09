/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface PipelineTasks extends Document {
  readonly _id: string;
  readonly userId: string;
  readonly pipeId: string;
  readonly taskId: string;
}

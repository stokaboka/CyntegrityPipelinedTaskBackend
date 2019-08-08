/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface PipeTasks extends Document {
  readonly id: number;
  readonly userId: number;
  readonly pipeId: number;
  readonly taskId: number;
}
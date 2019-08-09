/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface Pipelines extends Document {
  readonly userId: string;
  readonly name: string;
  readonly user: object;
  readonly runTime: number;
}

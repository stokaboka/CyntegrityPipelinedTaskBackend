/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface Tasks extends Document {
  readonly userId: string;
  readonly user: object;
  readonly name: string;
  readonly averageTime: number;
  readonly status: string;
}

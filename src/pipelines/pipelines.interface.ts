/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface Pipelines extends Document {
  readonly _id: string;
  readonly userId: string;
  readonly userName: string;
  readonly name: string;
}

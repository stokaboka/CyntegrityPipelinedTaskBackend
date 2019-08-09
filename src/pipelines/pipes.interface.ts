/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Document } from 'mongoose';

export interface Pipes extends Document {
  readonly _id: string;
  readonly userId: string;
  readonly name: string;
}
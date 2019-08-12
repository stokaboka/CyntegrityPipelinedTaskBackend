/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me 
 */

import { Document } from 'mongoose';

export interface Users extends Document {
  readonly login: string;
  readonly name: string;
}

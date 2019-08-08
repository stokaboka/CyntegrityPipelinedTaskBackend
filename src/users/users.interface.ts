import { Document } from 'mongoose';

export interface Users extends Document {
  readonly id: number;
  readonly login: string;
  readonly name: string;
}

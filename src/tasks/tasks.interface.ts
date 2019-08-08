import { Document } from 'mongoose';

export interface Tasks extends Document {
  readonly id: number;
  readonly userId: number;
  readonly name: string;
  readonly averageTime: number;
}

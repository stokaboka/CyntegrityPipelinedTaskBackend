import { Document } from 'mongoose';

export interface Pipes extends Document {
  readonly id: number;
  readonly userId: number;
  readonly name: string;
}

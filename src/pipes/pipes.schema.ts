import * as mongoose from 'mongoose';

export const PipesSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    name: String,
});

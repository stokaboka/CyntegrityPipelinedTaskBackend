import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    id: Number,
    login: String,
    name: String,
});

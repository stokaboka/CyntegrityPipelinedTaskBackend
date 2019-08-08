/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import * as mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    name: String,
    averageTime: Number,
});

/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import * as mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema({
    userId: String,
    user: Object,
    name: String,
    averageTime: Number,
});

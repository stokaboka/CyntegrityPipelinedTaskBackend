/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me 
 */

import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    id: Number,
    login: String,
    name: String,
});

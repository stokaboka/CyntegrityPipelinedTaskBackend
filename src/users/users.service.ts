/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './users.interface';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<Users>,
    ) {}

    async find(): Promise<Users[]> {
        return await this.usersModel.find().exec();
    }

    async create(user: UsersDto): Promise<Users> {
        const created = new this.usersModel(user);
        return await created.save();
    }

    async remove(user: UsersDto): Promise<any> {
        const forRemove = new this.usersModel(user);
        return await forRemove.delete();
    }
}

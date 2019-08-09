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

    async find(params: any = null): Promise<Users[]> {
        if(params){
            return await this.usersModel.find(params).exec();
        }else {
            return await this.usersModel.find().exec();
        }
    }

    async create(user: UsersDto): Promise<Users> {
        const model = new this.usersModel(user);
        return await model.save();
    }

    async save(user: UsersDto): Promise<Users> {
        console.log(user);
        const model = new this.usersModel(user);
        return await model.updateOne(model);
    }

    async remove(user: UsersDto): Promise<any> {
        const model = new this.usersModel(user);
        return await model.delete();
    }
}

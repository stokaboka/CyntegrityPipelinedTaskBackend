/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PipeTasks } from './pipe-tasks.interface';
import { PipeTasksDto } from './pipe-tasks.dto';

@Injectable()
export class PipeTasksService {
    constructor(
        @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
    ) {}

    async find(): Promise<PipeTasks[]> {
        return await this.pipeTasksModel.find().exec();
    }

    async create(pipeTask: PipeTasksDto): Promise<PipeTasks> {
        const created = new this.pipeTasksModel(pipeTask);
        return await created.save();
    }

}

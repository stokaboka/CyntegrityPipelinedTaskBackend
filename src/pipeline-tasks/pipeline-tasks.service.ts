/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PipeTasks } from './pipeline-tasks.interface';
import { PipelineTasksDto } from './pipeline-tasks.dto';

@Injectable()
export class PipelineTasksService {
    constructor(
        @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
    ) {}

    async find(): Promise<PipeTasks[]> {
        return await this.pipeTasksModel.find().exec();
    }

    async create(pipeTask: PipelineTasksDto): Promise<PipeTasks> {
        const created = new this.pipeTasksModel(pipeTask);
        return await created.save();
    }

}

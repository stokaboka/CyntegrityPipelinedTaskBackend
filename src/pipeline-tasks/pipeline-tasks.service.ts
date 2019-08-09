/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PipelineTasks } from './pipeline-tasks.interface';
import { PipelineTasksDto } from './pipeline-tasks.dto';

@Injectable()
export class PipelineTasksService {
    constructor(
        @InjectModel('PipelineTasks') private readonly pipeTasksModel: Model<PipelineTasks>,
    ) {}

    async find(params: any = null): Promise<PipelineTasks[]> {
        if(params){
            return await this.pipeTasksModel.find(params).exec();
        }else {
            return await this.pipeTasksModel.find().exec();
        }
    }

    async create(pipeTask: PipelineTasksDto): Promise<PipelineTasks> {
        const created = new this.pipeTasksModel(pipeTask);
        return await created.save();
    }

}

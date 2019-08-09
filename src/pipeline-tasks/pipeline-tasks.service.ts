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
        @InjectModel('PipelineTasks') private readonly pipelineTasksModel: Model<PipelineTasks>,
    ) {}

    async find(params: any = null): Promise<PipelineTasks[]> {
        if(params){
            return await this.pipelineTasksModel.find(params).exec();
        }else {
            return await this.pipelineTasksModel.find().exec();
        }
    }

    async save(pipelineTask: PipelineTasksDto): Promise<PipelineTasks> {
        const created = new this.pipelineTasksModel(pipelineTask);
        return await created.save();
    }

    async remove(pipelineTask: PipelineTasksDto): Promise<any> {
        const forRemove = new this.pipelineTasksModel(pipelineTask);
        return await forRemove.delete();
    }
}

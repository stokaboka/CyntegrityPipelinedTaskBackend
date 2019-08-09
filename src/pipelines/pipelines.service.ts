/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pipelines } from './pipelines.interface';
import { PipelinesDto } from './pipelines.dto';

@Injectable()
export class PipelinesService {
    constructor(
        @InjectModel('Pipelines') private readonly pipelinesModel: Model<Pipelines>,
    ) {}

    async find(params: any = null): Promise<Pipelines[]> {
        if(params){
            return await this.pipelinesModel.find(params).exec();
        }else {
            return await this.pipelinesModel.find().exec();
        }
    }

    async save(pipeline: PipelinesDto): Promise<Pipelines> {
        const created = new this.pipelinesModel(pipeline);
        return await created.save();
    }

    async remove(pipeline: PipelinesDto): Promise<any> {
        const forRemove = new this.pipelinesModel(pipeline);
        return await forRemove.delete();
    }
}

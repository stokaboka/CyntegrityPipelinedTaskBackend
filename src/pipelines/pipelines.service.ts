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
    if (params) {
      return await this.pipelinesModel.find(params).exec();
    } else {
      return await this.pipelinesModel.find().exec();
    }
  }

  async create(pipeline: PipelinesDto): Promise<Pipelines> {
    const model = new this.pipelinesModel(pipeline);
    return await model.save();
  }

  async save(pipeline: PipelinesDto): Promise<Pipelines> {
    const model = new this.pipelinesModel(pipeline);
    return await model.updateOne(model);
  }

  async remove(pipeline: PipelinesDto): Promise<any> {
    const model = new this.pipelinesModel(pipeline);
    return await model.delete();
  }

  async runTimeSum(params: any = null): Promise<any> {
    if (params) {
      return await this.pipelinesModel.aggregate([
        { $match: { ...params } },
        { $group: { _id: params, runTime: { $sum: 'runTime' } } },
      ]);
    } else {
      return await this.pipelinesModel.aggregate([
        {$group: {_id: null, runTime: { $sum: 'runTime' }}},
      ]);
    }
  }
}

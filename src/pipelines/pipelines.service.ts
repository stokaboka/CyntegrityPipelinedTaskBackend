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
        { $group: { _id: params, runTime: { $sum: '$runTime' } } },
      ]);
    } else {
      return await this.pipelinesModel.aggregate([
        { $group: { _id: null, runTime: { $sum: '$runTime' } } },
      ]);
    }
  }

  /**
   * idea from https://www.compose.com/articles/mongo-metrics-finding-a-happy-median/
   * but there is an error in the algorithm proposed in the article. For an odd sequence, the calculation is incorrect
   *
   * algorithm fixed
   *
   * @param params
   */
  async median(params: any = null): Promise<any> {
    return await this.pipelinesModel.aggregate([
      { $match: { ...params } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          values: { $push: '$runTime' },
        },
      },

      { $unwind: '$values' },

      { $sort: { values: 1 } },

      {
        $project: { count: 1, values: 1, midpoint: { $divide: ['$count', 2] } },
      },

      {
        $project: {
          count: 1,
          values: 1,
          midpoint: 1,
          high: { $ceil: '$midpoint' },
          low: { $floor: '$midpoint' },
        },
      },

      {
        $project: {
          count: 1,
          values: 1,
          midpoint: 1,
          h: '$high',
          l: '$low',
          high: {
            $cond: { if: { $eq: [ '$high', '$low' ] }, then: '$high', else: { $subtract: ['$high', 1] } },
          },
          low: {
            $cond: {if: {$eq: ['$high', '$low']}, then: {$subtract: ['$low', 1]}, else: '$low'},
          },
        },
      },

      {
        $group: {
          _id: null,
          values: { $push: '$values' },
          high: { $avg: '$high' },
          low: { $avg: '$low' },
        },
      },

      {
        $project: {
          values: 1,
          high: 1,
          low: 1,
          beginValue: { $arrayElemAt: ['$values', '$high'] },
          endValue: { $arrayElemAt: ['$values', '$low'] },
        },
      },

     { $project: {
         values: 1,
         high: 1,
         low: 1,
       median: { $avg: ['$beginValue', '$endValue'] } },
     },

    ]);
  }
}

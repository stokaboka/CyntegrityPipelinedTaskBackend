/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './tasks.interface';
import { TasksDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly tasksModel: Model<Tasks>,
  ) {}

  async find(params: any = null): Promise<Tasks[]> {
    if(params){
      return await this.tasksModel.find(params).exec();
    }else {
      return await this.tasksModel.find().exec();
    }
  }

  async averageTimeSum(params: any = null): Promise<any> {
    // console.log(params);
    if (params) {
      return await this.tasksModel.aggregate([
        { $match: { ...params } },
        { $group: { _id: params, averageTime: { $sum: '$averageTime' }}},
      ]);
    } else {
      return await this.tasksModel.aggregate([
        { $group: {_id: null, averageTime: { $sum: '$averageTime' }}},
      ]);
    }
  }

  async create(task: TasksDto): Promise<Tasks> {
    const model = new this.tasksModel(task);
    return await model.save();
  }

  async save(task: TasksDto): Promise<Tasks> {
    const model = new this.tasksModel(task);
    return await model.updateOne(model);
  }

  async remove(task: TasksDto): Promise<any> {
    const model = new this.tasksModel(task);
    return await model.delete();
  }
}

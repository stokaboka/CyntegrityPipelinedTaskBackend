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

  async find(): Promise<Tasks[]> {
    return await this.tasksModel.find().exec();
  }

  async create(task: TasksDto): Promise<Tasks> {
    const created = new this.tasksModel(task);
    return await created.save();
  }

}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './interfaces/tasks.interface';

import { PipeTasks } from './interfaces/pipeTasks.interface';
import { TasksDto } from './dto/tasks.dto';

import { PipeTasksDto } from './dto/pipeTasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly tasksModel: Model<Tasks>,
    @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
  ) {}

  async tasks(): Promise<Tasks[]> {
    return await this.tasksModel.find().exec();
  }


  async userTasks(): Promise<Tasks[]> {
    return await this.tasksModel.find().exec();
  }

  async pipeTasks(): Promise<PipeTasks[]> {
    return await this.pipeTasksModel.find().exec();
  }


  async createTask(task: TasksDto): Promise<Tasks> {
    const created = new this.tasksModel(task);
    return await created.save();
  }

}

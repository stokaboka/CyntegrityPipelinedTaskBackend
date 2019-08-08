import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './interfaces/tasks.interface';
import { Pipes } from './interfaces/pipes.interface';
import { PipeTasks } from './interfaces/pipeTasks.interface';
import { TasksDto } from './dto/tasks.dto';
import { PipesDto } from './dto/pipes.dto';
import { PipeTasksDto } from './dto/pipeTasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly tasksModel: Model<Tasks>,
    @InjectModel('Pipes') private readonly pipesModel: Model<Pipes>,
    @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
  ) {}

  async tasks(): Promise<Tasks[]> {
    return await this.tasksModel.find().exec();
  }

  async pipes(): Promise<Pipes[]> {
    return await this.pipesModel.find().exec();
  }

  async userTasks(): Promise<Tasks[]> {
    return await this.tasksModel.find().exec();
  }

  async userPipes(): Promise<Pipes[]> {
    return await this.pipesModel.find().exec();
  }

  async pipeTasks(): Promise<PipeTasks[]> {
    return await this.pipeTasksModel.find().exec();
  }


  async createTask(task: TasksDto): Promise<Tasks> {
    const created = new this.tasksModel(task);
    return await created.save();
  }

  async createPipe(pipe: PipesDto): Promise<Pipes> {
    const created = new this.pipesModel(pipe);
    return await created.save();
  }
}

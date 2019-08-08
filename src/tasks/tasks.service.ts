import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../users/users.interface';
import { Tasks } from './interfaces/tasks.interface';
import { Pipes } from './interfaces/pipes.interface';
import { PipeTasks } from './interfaces/pipeTasks.interface';
import { UsersDto } from '../users/users.dto';
import { TasksDto } from './dto/tasks.dto';
import { PipesDto } from './dto/pipes.dto';
import { PipeTasksDto } from './dto/pipeTasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly usersModel: Model<Users>,
    @InjectModel('Users') private readonly tasksModel: Model<Tasks>,
    @InjectModel('Pipes') private readonly pipesModel: Model<Pipes>,
    @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
  ) {}

  async tasks(): Promise<Users[]> {
    return await this.tasksModel.find().exec();
  }

  async pipes(): Promise<Users[]> {
    return await this.pipesModel.find().exec();
  }

  async userTasks(): Promise<Users[]> {
    return await this.tasksModel.find().exec();
  }

  async userPipes(): Promise<Users[]> {
    return await this.pipesModel.find().exec();
  }

  async pipeTasks(): Promise<Users[]> {
    return await this.pipeTasksModel.find().exec();
  }


  async createTask(task: TasksDto): Promise<Tasks> {
    const created = new this.tasksModel(task);
    return await created.save();
  }

  async createPipe(pipe: PipesDto): Promise<Tasks> {
    const created = new this.tasksModel(pipe);
    return await created.save();
  }
}

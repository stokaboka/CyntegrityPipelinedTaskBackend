import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './interfaces/users.interface';
import { Tasks } from './interfaces/tasks.interface';
import {Pipes } from "./interfaces/pipes.interface";
import {PipeTasks} from "./interfaces/pipeTasks.interface";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly usersModel: Model<Users>,
    @InjectModel('Users') private readonly tasksModel: Model<Tasks>,
    @InjectModel('Pipes') private readonly pipesModel: Model<Pipes>,
    @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
  ) {}
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PipeTasks } from './pipeTasks.interface';
import { PipeTasksDto } from './pipeTasks.dto';

@Injectable()
export class PipeTasksService {
    constructor(
        @InjectModel('PipeTasks') private readonly pipeTasksModel: Model<PipeTasks>,
    ) {}

    async find(): Promise<PipeTasks[]> {
        return await this.pipeTasksModel.find().exec();
    }

    async create(pipeTask: PipeTasksDto): Promise<PipeTasks> {
        const created = new this.pipeTasksModel(pipeTask);
        return await created.save();
    }

}

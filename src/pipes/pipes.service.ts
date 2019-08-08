import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pipes } from './pipes.interface';
import { PipesDto } from './pipes.dto';

@Injectable()
export class PipesService {
    constructor(
        @InjectModel('Pipes') private readonly pipesModel: Model<Pipes>,
    ) {}

    async find(): Promise<Pipes[]> {
        return await this.pipesModel.find().exec();
    }

    async create(pipe: PipesDto): Promise<Pipes> {
        const created = new this.pipesModel(pipe);
        return await created.save();
    }
}

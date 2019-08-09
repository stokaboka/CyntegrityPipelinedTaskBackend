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
        @InjectModel('Pipelines') private readonly pipesModel: Model<Pipelines>,
    ) {}

    async find(): Promise<Pipelines[]> {
        return await this.pipesModel.find().exec();
    }

    async create(pipe: PipelinesDto): Promise<Pipelines> {
        const created = new this.pipesModel(pipe);
        return await created.save();
    }
}

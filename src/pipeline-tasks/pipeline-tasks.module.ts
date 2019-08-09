/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelineTasksService } from './pipeline-tasks.service';
import { PipelineTasksController } from './pipeline-tasks.controller';
import { PipelineTasksSchema } from './pipeline-tasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PipeTasks', schema: PipelineTasksSchema },
    ]),
  ],
  providers: [PipelineTasksService],
  controllers: [PipelineTasksController]
})
export class PipelineTasksModule {}
